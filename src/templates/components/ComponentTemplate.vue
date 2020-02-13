<template>
  <div class="<%= data.title %>">
    <h1><%= data.title %> Component</h1>
  </div>
</template>

<script>
export default {
  name: <%= data.title %>,
}
</script>

<style scoped>
.<%= data.title %> {

}
</style>
