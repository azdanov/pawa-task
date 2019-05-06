<template>
  <div class="container">
    <div class="wrapper">
      <h1 class="title">404 <span class="separator"></span> Not Found</h1>
      <p class="subtitle">Try going <a class="link" href="/">Home?</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped lang="scss">
@import "../styles/variables";

.separator {
  display: inline-block;
  border: 2px solid $gray-900;
  margin: 0 10px -7px;
  height: 1.6ch;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title,
.subtitle {
  color: $gray-900;
}

.link {
  text-decoration: none;
  color: $gray-900;
  border-bottom: 2px solid;
}

.wrapper {
  margin-bottom: 15vh;
}
</style>
