<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'
import { VIDEO_CALL_HOST } from '@/constants'

const showVideoChat = ref(false)
const startCall = (userID: string) => {
  showVideoChat.value = true
  callRemote()
}

const roomId = '明光筑梦001'

const called = ref<boolean>(false) //是否是接收方
const caller = ref<boolean>(false) //是否是发起方
const calling = ref<boolean>(false) //呼叫中
const communicating = ref<boolean>(false) //视频通话中
const localVideo = ref<HTMLVideoElement>() // video标签实例，播放本人的视频
const remoteVideo = ref<HTMLVideoElement>() // video标签实例，播放对方的视频
const socket = ref<Socket>()
const peer = ref<any>()
const localStream = ref<any>()

defineExpose({ startCall })
// onMounted(() => {
//挂载

console.log('连接中***')
const sock = io(VIDEO_CALL_HOST)
setTimeout(() => {
  sock.emit('test', 'test')

  sock.on('connectSuccess', (msg) => {
    console.log('Client Connection Success!!!' + msg)
    console.log('连接成功***')
    sock.emit('joinRoom', roomId) //前端向后端发送加入房间请求
  })

  sock.on('connect_error', (error: any) => {
    console.error('连接失败***' + error)
  })

  sock.on('callRemote', () => {
    if (!caller.value) {
      called.value = true //接听方
      calling.value = true //中
    }
  })

  sock.on('acceptCall', async () => {
    //延迟一秒执行
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (caller.value) {
      showVideoChat.value = true
      //A收到B的同意申请
      peer.value = new RTCPeerConnection()
      //添加本地音视频流
      peer.value.addStream(localStream.value)

      //通过监听onicecandidate事件，当A收到B的icecandidate事件时，A会调用onicecandidate
      peer.value.onicecandidate = (event: any) => {
        if (event.candidate) {
          console.log(
            'A收到B的candidate事件！！！！！！！！！！！' + event.candidate
          )
          socket.value?.emit('sendCandidate', {
            type: 'candidate',
            room: roomId,
            sdp: event.candidate
          })
        }
      }
      //通过监听onaddstream事件，当A收到B的addstream事件时，A会调用onaddstream
      peer.value.onaddstream = (event: any) => {
        console.log('A收到B的addstream事件！')
        console.log(event.stream)
        calling.value = false
        communicating.value = true
        remoteVideo.value!.srcObject = event.stream
        remoteVideo.value!.play()
      }

      //生成offer
      const offer = await peer.value.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      })

      console.log(offer)
      //设置本地描述offer
      await peer.value.setLocalDescription(offer)
      //通过信令服务器将offer给B
      sock.emit('sendOffer', {
        type: 'offer',
        sdp: offer,
        room: roomId
      })
    }
  })

  //B收到offer
  sock.on('sendOffer', async (offer: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (called.value) {
      console.log('offer:' + offer)
      //创建自己的RTC
      peer.value = new RTCPeerConnection()
      //添加本地音视频流
      const stream = await getLocalStream()
      peer.value.addStream(stream)

      //通过监听onicecandidate事件，当B收到A的icecandidate事件时，A会调用onicecandidate
      peer.value.onicecandidate = (event: any) => {
        if (event.candidate) {
          console.log('B收到A的candidate事件！' + event.candidate)
          socket.value?.emit(
            'sendCandidate',
            JSON.stringify({
              roomId,
              candidate: event.candidate
            })
          )
          showVideoChat.value = true
        }
      }

      //通过监听onaddstream事件，当B收到A的addstream事件时，B调用onaddstream
      peer.value.onaddstream = (event: any) => {
        console.log('A收到B的addstream事件！')
        console.log(event.stream)
        calling.value = false
        communicating.value = true
        remoteVideo.value!.srcObject = event.stream
        remoteVideo.value!.play()
      }

      //设置远端描述信息 SDP
      await peer.value.setRemoteDescription(offer)
      //将offer强制转换为RTCSessionDescriptionInit类型
      const answer = await peer.value.createAnswer()
      console.log(answer)
      //存本地
      await peer.value.setLocalDescription(answer)
      //发送
      sock.emit('sendAnswer', {
        type: 'answer',
        sdp: answer,
        room: roomId
      })
    }
  })

  //收到answer
  sock.on('sendAnswer', async (answer: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (caller.value) {
      console.log('answer:' + answer)
      //设置远端answer信息
      peer.value.setRemoteDescription(answer)
    }
  })

  //收到candidate信息
  sock.on('sendCandidate', async (candidate: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('收到candidate:' + candidate)
    //设置远端candidate信息
    await peer.value.addIceCandidate(candidate)
  })

  //断开通话
  sock.on('hangUp', () => {
    console.log('连接断开！！！')
    //关闭AB的视频
    communicating.value = false
    calling.value = false
    caller.value = false
    called.value = false
    peer.value?.close()
    peer.value = null
    localStream.value = null
    localVideo.value!.pause()
    localVideo.value!.srcObject = null
    remoteVideo.value!.pause()
    remoteVideo.value!.srcObject = null

    showVideoChat.value = false
  })

  socket.value = sock
}, 1000)
// })

//获取本地音视频流
const getLocalStream = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })

  localVideo.value!.srcObject = stream
  localVideo.value!.play()

  localStream.value = stream
  return stream
}

//发起方发起视频请求
const callRemote = async () => {
  console.log('发起视频')
  //用户A向B发送视频请求
  caller.value = true //当前用户是发起方
  calling.value = true //表示正在呼叫中
  await getLocalStream()

  //通过信令服务器向B发起请求
  socket.value?.emit('callRemote', roomId)
}

//接收方同意视频请求
const acceptCall = () => {
  console.log('同意视频邀请')
  //通过信令服务器通知A
  socket.value?.emit('acceptCall', roomId)
}
//挂断视频
const hangUp = () => {
  console.log('挂断视频')
  socket.value?.emit('hangUp', roomId)
}

const point = ref('.')
let pointHandler: number
onMounted(() => {
  pointHandler = setInterval(() => {
    if (point.value == '.') point.value = '..'
    else if (point.value == '..') point.value = '...'
    else point.value = '.'
  }, 1000)
})
onUnmounted(() => {
  clearInterval(pointHandler)
})
</script>
<template>
  <div class="video-chat-container" v-show="showVideoChat || calling">
    <video ref="remoteVideo" class="remote-video"></video>
    <video ref="localVideo" class="local-video"></video>
    <div class="control-panel">
      <div v-if="caller && calling" class="call-waiting-overlay overlay">
        <p class="overlay-hint">等待对方接听{{ point }}</p>
        <img @click="hangUp" src="/imgs/refuse.svg" class="icon" alt="拒绝" />
      </div>
      <div v-if="called && calling" class="invitation-received-overlay overlay">
        <p class="overlay-hint">收到视频邀请{{ point }}</p>
        <div class="button-group">
          <img
            @click="acceptCall"
            src="/imgs/accept.svg"
            class="icon"
            alt="接受"
          />
          <img @click="hangUp" src="/imgs/refuse.svg" class="icon" alt="拒绝" />
        </div>
      </div>
      <div v-if="!calling" class="calling-overlay overlay">
        <img @click="hangUp" src="/imgs/refuse.svg" class="icon" alt="拒绝" />
      </div>
    </div>
  </div>

  <!-- <div class="video-container"></div> -->
  <!-- <div class="button-container">
      <button class="start-call-button" @click="callRemote">发起视频</button>
      <button class="hang-up-button" @click="hangUp">挂断视频</button>
    </div> -->
</template>

<style>
.video-chat-container {
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100vw;

  position: absolute;
  top: 0;
  left: 0;

  background-color: #2e2e2e;
}

.remote-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.local-video {
  width: 50%;
  max-width: 120px;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  border: 2px solid #fff; /* 添加边框以突出显示 */
  border-radius: 5px;
}
.control-panel {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #f2f2f2;
  font-size: large;
  font-weight: bold;
}

.overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.overlay-hint {
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.button-group > img {
  margin: 15px;
}

.calling-overlay {
  position: fixed;
  bottom: 20px;
}
</style>
