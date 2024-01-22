<template>
  <div>
    <!-- <HomeHeroSection />
        <HomeAboutSection /> -->
    <header class="profileSection pt-[24px]">
      <article class="sada-container">
        <div class="profileContainer flex gap-[16px]">
          <NuxtImg
            src="/img/designbyfaizi-logo.svg"
            class="w-[44px] h-[44px] rounded-full"
          />
          <div class="profileContent flex flex-col">
            <h1 class="text-white text-[16px] leading-[130%] font-500">Faizan Ullah</h1>
            <p class="text-[16px] leading-[130%] font-400">B. 1999</p>
          </div>
        </div>
      </article>
    </header>
    <section class="infoSection py-[64px]">
      <article class="sada-container">
        <div class="infoContainer flex flex-col gap-[24px]">
          <div class="infoContentContainer flex flex-col gap-[16px]">
            <div class="iDesign flex gap-[7px] text-[28px] leading-[120%] font-500">
              <h2>I design</h2>
              <h2 class="text-white">apps</h2>
            </div>
            <p class="text-[23px] leading-[130%]">
              I am Faizan Ullah. A passionate frontend engineer living in Rawalpindi,
              Pakistan. I specialize in product design, web design, branding and art.
            </p>
          </div>
          <div class="availableContainer flex items-center gap-[6px]">
            <div class="green-dot bg-teal-400 w-[10px] h-[10px] rounded-full"></div>
            <p class="text-[14px]">Available for new opportunities</p>
          </div>
          <SadaButton
            :as="NuxtLink"
            to="/contact"
            :leftSection="ButtonIcon"
            radius="md"
            class="me-auto"
          >
            Contact me
          </SadaButton>
        </div>
      </article>
    </section>
    <section class="productsSection pb-[32px]">
      <div class="productsContainer w-full flex flex-col gap-[24px]">
        <div
          class="productsHeadingContainer sada-container flex justify-between items-center"
        >
          <h3 class="text-[18px] font-500 text-white">Products</h3>
          <NuxtLink
            to="/products"
            class="flex items-center gap-[4px] hover:(text-white) transition-all duration-200"
          >
            <p class="text-[16px]">All</p>
            <Icon name="fluent:arrow-right-12-regular" class="w-[16px] h-[16px]" />
          </NuxtLink>
        </div>
        <div class="productsContainer sada-container-lg flex flex-col">
          <Product
            v-for="_product in products"
            :key="_product.name"
            :product="_product"
          />
        </div>
      </div>
    </section>
    <section class="socialSection py-[32px]">
      <article class="sada-container">
        <div class="socialContainer flex flex-col gap-[24px]">
          <h3 class="text-[18px] font-500 text-white">Where</h3>
          <div class="socialLinks flex flex-col gap-[16px]">
            <SocialLink
              v-for="_link in socialLinks"
              :key="_link.name"
              :name="_link.name"
              :to="_link.to"
            />
          </div>
        </div>
      </article>
    </section>
    <section class="projectsSection py-[32px]">
      <article class="sada-container">
        <div class="projectsContainer flex flex-col gap-[24px]">
          <div class="projectsHeadingContainer flex justify-between items-center">
            <h3 class="text-[18px] font-500 text-white">Projects</h3>
            <NuxtLink
              to="/projects"
              class="flex items-center gap-[4px] hover:(text-white) transition-all duration-200"
            >
              <p class="text-[16px]">All</p>
              <Icon name="fluent:arrow-right-12-regular" class="w-[16px] h-[16px]" />
            </NuxtLink>
          </div>
          <div class="projectLinks flex flex-col gap-[16px]">
            <ProjectLink
              v-for="_project in projects"
              :key="_project.name"
              :project="_project"
            />
          </div>
        </div>
      </article>
    </section>
    <section class="writingsSection py-[32px]">
      <article class="sada-container">
        <div class="writingsContainer flex flex-col gap-[24px]">
          <div class="writingsHeadingContainer flex justify-between items-center">
            <h3 class="text-[18px] font-500 text-white">Writing</h3>
            <NuxtLink
              to="/blog"
              class="flex items-center gap-[4px] hover:(text-white) transition-all duration-200"
            >
              <p class="text-[16px]">All</p>
              <Icon name="fluent:arrow-right-12-regular" class="w-[16px] h-[16px]" />
            </NuxtLink>
          </div>
          <div class="projectLinks flex flex-col gap-[16px]">
            <WritingLink v-for="_blog in blogs" :key="_blog.heading" :blog="_blog" />
          </div>
        </div>
      </article>
    </section>
    <SiteColors />
  </div>
</template>

<script setup lang="tsx">
const route = useRoute();
const config = useRuntimeConfig();
const site_title = "Design By Faizi";
const site_description = "I am Faizan Ullah. A passionate frontend engineer living in Rawalpindi, Pakistan. I specialize in product design, web design, branding and art.";

import { NuxtLink, Icon } from "#components";
const { socialLinks } = useNav();
const { projects } = useProjects();
const { products } = useProducts();
const { blogs } = useBlogs();
useHead({
  title: site_title,
  meta: [
    {
      name: "description",
      content: site_description,
    },
    {
      name: "image",
      content: `${config.public.SITE_URL}${route.fullPath}`,
    },
    {
      name: "robots",
      content: "all",
    },
    //Open Graph Tags
    { property: "og:title", content: site_title },
    {
      property: "og:description",
      content: site_description,
    },
    {
      property: "og:url",
      content: `${config.public.SITE_URL}${route.fullPath}`,
    },
    {
      property: "og:image",
      content: `${config.public.SITE_URL}/og.png`,
    },
    {
      property: "og:type",
      content: "website",
    },
    //Twitter Tags
    { name: "twitter:title", content: site_title },
    {
      name: "twitter:description",
      content: site_description,
    },
    {
      name:"twitter:image", content:`${config.public.SITE_URL}/twitter.png`
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@designbyfaizi" },
    { name: "twitter:creator", content: "@designbyfaizi" },
  ],
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ],
  bodyAttrs: {
    class: "test",
  },
  script: [{ innerHTML: "console.log('Greetings from Faizan')" }],
});

definePageMeta({
  layout: "main-layout",
});

const ButtonIcon = () => (
  <Icon name="fluent:mail-32-regular" size="20" class="text-main" />
);
</script>
