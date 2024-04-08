export default function useSeoData(Title, Description) {
    useHead({
      title: Title,
      meta: [
        { name: 'description', content: Description },
      ],
    });
  }

  // вызываем на страницах useSeoData(indexData.value.seo_data.title, indexData.value.seo_data.meta_description);