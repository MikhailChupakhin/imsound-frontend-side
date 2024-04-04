<template>
    <Head>
        <Title>{{ metaTitle }}</Title>
    </Head>
</template>

<script setup>
const props = defineProps({
  metaTitle: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
});
</script>