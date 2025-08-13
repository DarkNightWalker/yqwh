<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 导入图片资源
import memories1 from '@/assets/memories1.jpg'
import memories2 from '@/assets/memories2.jpg'
import memories3 from '@/assets/memories3.jpg'
import future1 from '@/assets/future1.jpg'
import future2 from '@/assets/future2.jpg'
import future3 from '@/assets/future3.jpg'

interface Item { image: string; text: string }

const props = defineProps<{ type: 'memories' | 'future' }>()
const router = useRouter()

const title = computed(() => (props.type === 'memories' ? '美好回忆' : '未来憧憬'))

const items = computed<Item[]>(() =>
    props.type === 'memories'
        ? [
          { image: memories1, text: '那天阳光刚刚好。' },
          { image: memories2, text: '算命大师。' },
          { image: memories3, text: '可爱捏。' }
        ]
        : [
          { image: future1, text: '想牵着你看一次极光漫天。' },
          { image: future2, text: '一起把家装满喜欢的颜色。' },
          { image: future3, text: '等白发苍苍，还一起荡秋千。' }
        ]
)

const activeIndex = ref(0)
const next = () => (activeIndex.value = (activeIndex.value + 1) % items.value.length)
const prev = () => (activeIndex.value = (activeIndex.value - 1 + items.value.length) % items.value.length)
</script>
