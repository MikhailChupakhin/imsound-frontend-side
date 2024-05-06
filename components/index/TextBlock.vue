<template>
    <div class="headers-container">
        <h1>Интернет-магазин световой и музыкальной техники IMSOUND</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a ultricies metus. Sed nec molestie.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nullam a ultricies metus. Sed nec molestie.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Nullam a ultricies metus. Sed nec molestie.
        </p>
        <Divider />
        <Accordion :multiple="true" :activeIndex="0">
            <AccordionTab header="Ассортимент магазина">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est
                    laborum.
                </p>
            </AccordionTab>
            <AccordionTab header="Header II">
                <p class="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                    dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam
                    eius modi.
                </p>
            </AccordionTab>
            <AccordionTab header="Header III">
                <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                    deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                    provident, similique sunt in
                    culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                    facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
                    nihil impedit quo minus.
                </p>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<script setup>
import Divider from 'primevue/divider';

</script>

<style scoped>
.headers-container {
    width: 100%;
    height: 100%;
    padding: 2rem;
}

.headers-container h1 {
    font-size: 2rem;
}

.headers-container p {
    font-size: 1.3rem;
}

@media screen and (max-width: 700px) {
    .headers-container h1 {
        font-size: 1.5rem;
    }
    .headers-container p {
        font-size: 1.1rem;
    }
}



.bullit {
    padding-inline-start: 1rem;
}
</style>