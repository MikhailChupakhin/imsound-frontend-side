<template>
    <Head>
        <Title>{{ metaTitle }}</Title>
        <Meta charset="UTF-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content={{ metaDescription }} />
        <Meta name="author" content="by Mikhail Chupakhin, 2024" />
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
console.log(props.metaDescription);
</script>