<template>
  <div class="bottom">
    <div class="thirdQueue">
      <Row>
      </Row>
    </div>
    <div class="secondQueue">
      <Row>
      </Row>
    </div>
    <div class="firstQueue">
      <Row
        is="my-card"
        v-for="msg in cards"
        v-bind:message="msg"
      >
      </Row>
    </div>
    <div class="chooseCard">
      <Row
        is="my-card"
        v-for="msg in cards"
        v-bind:message="msg"
      >
      </Row>
    </div>
  </div>
</template>

<script>
  import myCard from './myCard'
  export default {
    data: function () {
      return {
        cards: [
          {
            id: 'progress1',
            time: 13
          },
          {
            id: 'progress2',
            time: 13
          },
          {
            id: 'progress3',
            time: 1
          },
          {
            id: 'progress4',
            time: 3
          }
        ]
      }
    },
    components: {
      myCard
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
</style>
