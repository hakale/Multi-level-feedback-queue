<template>
  <i-col span="6" >
    <Card :bordered="false" style="width:70px;height:100px;backgroud: url()">
      <p style="position: relative;top:2px;left:3px;font-size:15px;">{{message['time']}}</p><br>
      <p style="position: relative;top:30px;font-size: 13px;text-align: center">{{message['id']}}</p>
    </Card>
  </i-col>
</template>

<script>
  export default {
    props: ['message']
  }
</script>

<style>
  .ivu-card-body{
    padding: 0px;
  }
  .ivu-card{
    background: url(../../../dist/card-bg1.png);
    color: #ffffff;
  }
</style>
