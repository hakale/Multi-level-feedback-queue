<template>
  <div class="bottom">
    <div class="thirdQueue">
      <Row
        is="my-card"
        v-model="thirdQueueCards"
        v-for="msg3 in thirdQueueCards"
        v-bind:message="msg3"
      >
      </Row>
    </div>
    <div class="secondQueue">
      <Row
        is="my-card"
        v-model="secondQueueCards"
        v-for="msg2 in secondQueueCards"
        v-bind:message="msg2"
      >
      </Row>
    </div>

    <div class="firstQueue">
      <transition-group name="slide">
        <Row
          is="my-card"
          v-model="firstQueueCards"
          v-for="msg1 in firstQueueCardsCache"
          v-bind:message="msg1"
          v-bind:key="msg1['time']"
        >
        </Row>
      </transition-group>
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
            totaltime: 2,
            time: 2
          },
          {
            id: 'progress2',
            totaltime: 4,
            time: 4
          },
          {
            id: 'progress3',
            totaltime: 6,
            time: 6
          },
          {
            id: 'progress4',
            totaltime: 8,
            time: 8
          }
        ],
        selectedCards: [
        ],
        isDragging: false,
        delayedDragging: false
      }
    },
    methods: {
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element
        const draggedElement = draggedContext.element
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
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
          firstCache.push({id: '...', totaltime: firstCacheTotalTime, time: firstCacheTime})
        }
        return firstCache
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
          var randomProcessId = 'process' + Math.ceil(Math.random() * 3)
          var randomProcessTime = Math.ceil(Math.random() * 20)
          this.waitingCards.push({id: randomProcessId, totaltime: randomProcessTime, time: randomProcessTime})
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
    transition: all .5s ease;
  }
  .slide-leave-active {
    transition: opacity .2s;
    opacity: 0;
  }
  .slide-enter{
    transform: translateX(10px);
    opacity: 0;
  }
  .ghost{
    opacity: 0.5;
  }
</style>
