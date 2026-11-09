<template>
  <!-- Tables in posts scroll sideways on their own when a cell holds long code,
       instead of pushing the whole page wider than a phone. -->
  <div class="overflow-x-auto">
    <table><slot /></table>
  </div>
</template>
