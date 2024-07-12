<template>
  <div id="fenView">
    <div class="feng-container">
      <div class="line" v-for="row in 4" :key="row">
        <div
          class="item"
          v-for="col in 10"
          :key="col"
          @mouseenter="handleMouseEnter(row, col)"
          @mouseleave="handleMouseLeave(row, col)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeItem = ref(null);

function handleMouseEnter(row, col) {
  activeItem.value = { row, col };
  updateNeighbors(row, col, true);
}

function handleMouseLeave(row, col) {
  updateNeighbors(row, col, false);
  activeItem.value = null;
}

function updateNeighbors(row, col, add) {
  const neighborPositions = [];
  // 计算基于当前行是奇数行还是偶数行的邻居位置
  if (row % 2 === 1) {
    // 奇数行
    neighborPositions.push({ r: row - 1, c: col + 1 });
    neighborPositions.push({ r: row - 1, c: col });
    neighborPositions.push({ r: row, c: col - 1 });
    neighborPositions.push({ r: row, c: col + 1 });
    neighborPositions.push({ r: row + 1, c: col + 1 });
    neighborPositions.push({ r: row + 1, c: col });
  } else {
    // 偶数行
    neighborPositions.push({ r: row - 1, c: col - 1 });
    neighborPositions.push({ r: row - 1, c: col });
    neighborPositions.push({ r: row, c: col - 1 });
    neighborPositions.push({ r: row, c: col + 1 });
    neighborPositions.push({ r: row + 1, c: col });
    neighborPositions.push({ r: row + 1, c: col - 1 });
  }

  neighborPositions.forEach(({ r, c }) => {
    if (r > 0 && r <= 4 && c > 0 && c <= 10) {
      // 确保索引有效
      const line = document.querySelector(
        `.feng-container .line:nth-child(${r})`
      );
      const item = line?.children[c - 1];
      if (item) {
        item.classList.toggle("shrink", add);
      }
    }
  });
}
</script>

<style scoped>
.feng-container {
  --n: 9;
  --size: calc(100vw / var(--n));
}

.feng-container .line {
  display: flex;
}

.feng-container .line:nth-child(even) {
  transform: translateX(calc(-1 * var(--size) / 2));
}

.feng-container .line:nth-child(n + 2) {
  margin-top: calc(-1 * var(--size) / 6);
}

.feng-container .item {
  width: var(--size);
  height: var(--size);
  flex-shrink: 0;
  background: #444444;
  outline: 1px solid red; /* 外边框 */
  clip-path: polygon(50% 0%, 97% 25%, 97% 75%, 50% 100%, 2% 75%, 2% 25%);
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease; /* 添加过渡效果 */
}

.feng-container .item:hover {
  transform: scale(1.2); /* 鼠标悬停时放大 */
}

.feng-container .item.shrink {
  transform: scale(0.7); /* 周围元素缩小 */
}
</style>
