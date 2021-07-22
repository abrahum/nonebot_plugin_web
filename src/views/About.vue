<template>
  <div class="about">
    <h1 @click="toastr_test">This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class about extends Vue {}
</script>

