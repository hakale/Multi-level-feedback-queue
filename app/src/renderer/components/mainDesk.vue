<template>
  <div class="bottom">
    <div class="thirdQueue">
      <Row :gutter="40">
        <i-col span="4">
          <Card style="width:70px;height:90px">
          </Card>
        </i-col>
        <i-col span="4">
        </i-col>
        <i-col span="4">
        </i-col>
        <i-col span="4">
        </i-col>
        <i-col span="4">
        </i-col>
      </Row>
    </div>
    <div class="secondQueue">
      <Row :gutter="40">
        <i-col span="4">
          <Card style="width:70px;height:100px">
          </Card>
        </i-col>
        <i-col span="4">
        </i-col>
        <i-col span="4">
        </i-col>
        <i-col span="4">
        </i-col>
        <i-col span="4">
        </i-col>
      </Row>
    </div>
    <div class="firstQueue">
      <Row :gutter="40">
        <i-col span="4">
          <Card style="width:70px;height:100px">
          </Card>
        </i-col>
        <i-col span="4">
        </i-col>
        <i-col span="4">
        </i-col>
        <i-col span="4">
        </i-col>
        <i-col span="4">
        </i-col>
      </Row>
    </div>
    <div class="chooseCard">
      <Row :gutter="60">
        <i-col span="4">
          <Card style="width:70px;height:100px">
            <p>id:,time:</p>
          </Card>
        </i-col>
        <i-col span="4">
          <Card style="width:70px;height:100px">
          </Card>
        </i-col>
        <i-col span="4">
          <Card style="width:70px;height:100px">
          </Card>
        </i-col>
        <i-col span="4">
          <Card style="width:70px;height:100px">
          </Card>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
  import mycard from './myCard'
  export default {
    components: {
      mycard
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
    left: 160px;
    top: 80px;
  }
  .secondQueue{
    position: fixed;
    left: 160px;
    top: 230px;
  }
  .firstQueue{
    position: fixed;
    left: 160px;
    top: 390px;
  }
  .chooseCard{
    position: fixed;
    left: 230px;
    top: 515px;
  }
</style>
