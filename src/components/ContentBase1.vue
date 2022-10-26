<template>
    <div class="home">
      <div class="container">
        <div class="card">
          <div class="card-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      name: "ContentBase1",
  }
  </script>
  
  <style scoped>
.card {
    width: 20vw;
    left: 5vw;
    top: 30vh;
}
  .container {
    margin-top: 20px;
  }
  </style>