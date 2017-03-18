<template>
  <i-col span="6" >
    <Card style="width:70px;height:100px;font-size:10px;">
      <p>{{message['id']}}</p><br>
      <p>{{message['time']}}</p>
    </Card>
  </i-col>
</template>

<script>
  export default {
    props: ['message']
  }
</script>

<style>

</style>
