export default function useSeoData(Title, Description) {
  const computedTitle = computed(() => Title);
  const computedDescription = computed(() => Description);

  useHead(() => ({
    title: computedTitle.value,
    meta: [
      { name: 'description', content: computedDescription.value },
      { property: 'og:title', content: computedTitle.value },
      { property: 'og:description', content: computedDescription.value },
      { name: 'twitter:title', content: computedTitle.value },
      { name: 'twitter:description', content: computedDescription.value },
    ],
  }));
}
  // вызываем на страницах useSeoData(indexData.value.seo_data.title, indexData.value.seo_data.meta_description);