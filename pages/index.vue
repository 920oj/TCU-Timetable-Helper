<template>
  <div class="index">
    <myheader />
    <div class="container">
      <div class="jumbotron" id="description">
        <h1 class="display-4">TCU Timetable Helper(β)</h1>
        <p class="lead">TCU Timetable Helperは、東京都市大学の各学科時間割から単位数を計算し、受講する科目の選択を補助するWebアプリです。現在、2019年度後期社会メディア学科の時間割のみ対応しています。</p>
        <hr class="my-4" />
        <p>このWebアプリはβ版です。情報が間違っていたり、動作が不安定な部分がありますので、ご了承ください。バグ報告等は<a href="https://twitter.com/920oj">作者Twitter</a>までお願いします。</p>
        <nuxt-link to="/pre"><button type="button" class="btn btn-primary">社会メディア学科: はじめる</button></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "~/components/header.vue";

export default {
  components: {
    myheader,
  },

};
</script>

<style>
#description {
  color: #282828;
  font-family: "Noto Sans JP", sans-serif;
}
