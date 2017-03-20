<template>
  <div class="bottom">
    <div class="thirdQueue">
      <transition-group name="slide">
        <Row
          is="my-card"
          v-model="thirdQueueCards"
          v-for="msg3 in thirdQueueCardsCache"
          v-bind:message="msg3"
          v-bind:key="msg3['index']"
        >
        </Row>
      </transition-group>
    </div>
    <div class="secondQueue">
      <transition-group name="slide">
        <Row
          is="my-card"
          v-model="secondQueueCards"
          v-for="msg2 in secondQueueCardsCache"
          v-bind:message="msg2"
          v-bind:key="msg2['index']"
        >
        </Row>
      </transition-group>
    </div>
    <div class="firstQueue">
      <transition-group name="slide">
        <Row
          is="my-card"
          v-model="firstQueueCards"
          v-for="msg1 in firstQueueCardsCache"
          v-bind:message="msg1"
          v-bind:key="msg1['index']"
        >
        </Row>
      </transition-group>
    </div>
    <div class="buttonsFirstRow">
      <Button-group shape="circle" size="small">
        <i-button type="success">
          <Icon type="chevron-left"></Icon>
          减速
        </i-button>
        <i-button @click.native="pauseQueue" type="success">
          暂停
        </i-button>
        <i-button type="success">
          加速
          <Icon type="chevron-right"></Icon>
        </i-button>
      </Button-group>
    </div>
    <div class="buttonsSecondRow">
      <i-button @click.native="startQueue" type="primary" size="small" shape="circle" long>
        开始
      </i-button>
    </div>
    <div class="buttonsThirdRow">
      <i-button type="error" size="small" shape="circle" long>
        结束
      </i-button>
    </div>
    <draggable class="selected" v-model="selectedCards" :options="dragOptions" :move="onMove" >
      <Row>
      </Row>
    </draggable>
    <draggable class="chooseCard" v-model="waitingCards" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
      <Row
        is="my-card"
        v-for="msg in waitingCards"
        v-bind:message="msg"
      >
      </Row>
    </draggable>
    <draggable class="deleted" :options="dragOptions" :move="onMove" >
    </draggable>
  </div>
</template>

<script>
  import myCard from './myCard'
  import draggable from 'vuedraggable'
  export default {
    data: function () {
      return {
        thirdQueueCards: [
        ],
        secondQueueCards: [
        ],
        firstQueueCards: [
        ],
        waitingCards: [
          {
            id: 'progress1',
            index: 1,
            totaltime: 2,
            time: 2
          },
          {
            id: 'progress2',
            index: 2,
            totaltime: 4,
            time: 4
          },
          {
            id: 'progress3',
            index: 3,
            totaltime: 6,
            time: 6
          },
          {
            id: 'progress4',
            index: 4,
            totaltime: 8,
            time: 8
          }
        ],
        selectedCards: [
        ],
        index: 4,
        caculatingTime: 1000,
        isCaculating: false,
        caculateApp: null,
        firstQueueCost: 2,
        secondQueueCost: 4,
        thirdQueueCost: 6,
        isDragging: false,
        delayedDragging: false
      }
    },
    methods: {
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element
        const draggedElement = draggedContext.element
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
      caculateQueue () {
        if (this.firstQueueCards.length !== 0) {
          this.firstQueueCards[0]['time'] -= this.firstQueueCost
          if (this.firstQueueCards[0]['time'] > 0) {
            this.secondQueueCards.push(this.firstQueueCards.shift())
          } else {
            this.firstQueueCards.shift()
          }
        } else if (this.secondQueueCards.length !== 0) {
          this.secondQueueCards[0]['time'] -= this.secondQueueCost
          if (this.secondQueueCards[0]['time'] > 0) {
            this.thirdQueueCards.push(this.secondQueueCards.shift())
          } else {
            this.secondQueueCards.shift()
          }
        } else if (this.thirdQueueCards.length !== 0) {
          this.thirdQueueCards[0]['time'] -= this.thirdQueueCost
          if (this.thirdQueueCards[0]['time'] > 0) {
            this.thirdQueueCards.push(this.thirdQueueCards.shift())
          } else {
            this.thirdQueueCards.shift()
          }
        }
      },
      startQueue () {
        if (this.firstQueueCards.length === 0 && this.secondQueueCards.length === 0 && this.thirdQueueCards.length === 0) {
          alert('请将至少一张进程卡片加入队列')
        } else {
          this.caculateApp = setInterval(this.caculateQueue, this.caculatingTime)
        }
      },
      pauseQueue () {
        clearInterval(this.caculateApp)
      }
    },
    computed: {
      dragOptions () {
        return {
          animation: 0,
          group: 'description',
          ghostClass: 'ghost'
        }
      },
      firstQueueCardsCache: function () {
        var firstCache = this.firstQueueCards.slice(0, 3)
        if (this.firstQueueCards.length >= 4) {
          var firstCacheTime = 0
          var firstCacheTotalTime = 0
          for (var i = 3; i < this.firstQueueCards.length; i++) {
            firstCacheTotalTime += this.firstQueueCards[i]['totaltime']
            firstCacheTime += this.firstQueueCards[i]['time']
          }
          firstCache.push({id: '...', index: this.firstQueueCards[3]['index'], totaltime: firstCacheTotalTime, time: firstCacheTime})
        }
        return firstCache
      },
      secondQueueCardsCache: function () {
        var secondCache = this.secondQueueCards.slice(0, 3)
        if (this.secondQueueCards.length >= 4) {
          var secondCacheTime = 0
          var secondCacheTotalTime = 0
          for (var i = 3; i < this.secondQueueCards.length; i++) {
            secondCacheTotalTime += this.secondQueueCards[i]['totaltime']
            secondCacheTime += this.secondQueueCards[i]['time']
          }
          secondCache.push({id: '...', index: this.secondQueueCards[3]['index'], totaltime: secondCacheTotalTime, time: secondCacheTime})
        }
        return secondCache
      },
      thirdQueueCardsCache: function () {
        var thirdCache = this.thirdQueueCards.slice(0, 3)
        if (this.thirdQueueCards.length >= 4) {
          var thirdCacheTime = 0
          var thirdCacheTotalTime = 0
          for (var i = 3; i < this.thirdQueueCards.length; i++) {
            thirdCacheTotalTime += this.thirdQueueCards[i]['totaltime']
            thirdCacheTime += this.thirdQueueCards[i]['time']
          }
          thirdCache.push({id: '...', index: this.thirdQueueCards[3]['index'], totaltime: thirdCacheTotalTime, time: thirdCacheTime})
        }
        return thirdCache
      }
    },
    watch: {
      isDragging (newValue) {
        if (newValue) {
          this.delayedDragging = true
          return
        }
        this.$nextTick(() => {
          this.delayedDragging = false
        })
      },
      selectedCards () {
        if (this.selectedCards.length >= 1) {
          this.firstQueueCards.push(this.selectedCards.shift())
        }
      },
      waitingCards () {
        if (this.waitingCards.length < 4) {
          var randomProcessId = 'process' + Math.ceil(Math.random() * 20)
          var randomProcessTime = Math.ceil(Math.random() * 20)
          ++(this.index)
          this.waitingCards.push({id: randomProcessId, index: this.index, totaltime: randomProcessTime, time: randomProcessTime})
        }
      }
    },
    components: {
      myCard,
      draggable
    },
    name: 'main-desk'
  }
</script>

<style scoped>
  .bottom{
    width: 997px;
    height: 617px;
    background: url(../../../dist/background.png);
    background-size: cover;
  }
  .thirdQueue{
    position: fixed;
    width: 480px;
    left: 160px;
    top: 80px;
  }
  .secondQueue{
    position: fixed;
    width: 480px;
    left: 160px;
    top: 230px;
  }
  .firstQueue{
    position: fixed;
    width: 480px;
    left: 160px;
    top: 390px;
  }
  .buttonsFirstRow{
    position: fixed;
    width: 160px;
    left: 815px;
    top: 387px;
  }
  .buttonsSecondRow{
    position: fixed;
    width: 140px;
    left: 815px;
    top: 422px;
  }
  .buttonsThirdRow{
    position: fixed;
    width: 140px;
    left: 815px;
    top: 455px;
  }
  .chooseCard{
    position: fixed;
    width: 400px;
    left: 230px;
    top: 515px;
  }
  .selected{
    position: fixed;
    height: 100px;
    width: 70px;
    left: 130px;
    top: 515px;
  }
  .deleted{
    position: fixed;
    height: 100px;
    width: 70px;
    left: 810px;
    top: 515px;
  }
  .slide-enter-active {
    transition: all 1s ease-in;
  }
  .slide-leave-active {
    transition: all .5s ease-out;
  }
  .slide-enter{
    transform: translateX(10px);
    opacity: 0;
  }
  .slide-leave{
    opacity: 0;
  }
  .ghost{
    opacity: 0.5;
  }
</style>
