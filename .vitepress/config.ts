import { defineConfigWithTheme } from "vitepress";
import type { ThemeConfig } from '@hempworks/pilgrim'
import config from '@hempworks/pilgrim/config'

export default defineConfigWithTheme<ThemeConfig>({
    extends: config,
    title: 'Laravel Vapor',
    description: 'Laravel at Infinite Scale',
    base: '/',
    cleanUrls: false,
    srcDir: 'src',

    head: [
        ['link', {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
        }],
        ['link', {
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png',
            href: '/favicon-16px.png',
        }],
        ['link', {
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png',
            href: '/favicon-32px.png',
        }],
        ['link', {
            rel: 'mask-icon',
            href: '/safari-pinned-tab.svg',
        }],
        ['meta', {
            name: 'msapplication-TileColor',
            content: '#4099DE',
        }],
        ['meta', {
            name: 'msapplication-TileImage',
            content: '/mstile-150x150.png',
        }],
        ['meta', {
            property: 'og:image',
            content: '/social-share.png',
        }],
        ['meta', {
            property: 'twitter:card',
            content: 'summary_large_image',
        }],
        ['meta', {
            property: 'twitter:creator',
            content: '@laravelphp',
        }],
        ['meta', {
            property: 'twitter:image',
            content: '/social-share.png',
        }],
    ],

    themeConfig: {
        logo: {
            light: '/logo.svg',
            dark: '/logo-dark.svg',
        },
        nav: [
            { text: 'Laravel Vapor', link: 'https://vapor.laravel.com' },
            { text: 'Video Tutorials', link: 'https://www.youtube.com/watch?v=4WvRChmRhDo&list=PLcjapmjyX17gqhjUz8mgTaWzSv1FPgePD' },
        ],
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Introduction', link: '/introduction' },
                ],
              },
              {
                text: 'Projects',
                items: [
                  { text: 'The Basics', link: '/projects/the-basics' },
                  { text: 'Environments', link: '/projects/environments.html' },
                  { text: 'Deployments', link: '/projects/deployments.html' },
                  { text: 'Development', link: '/projects/development.html' },
                  { text: 'Domains', link: '/projects/domains.html' },
                  { text: 'Troubleshooting', link: '/projects/troubleshooting.html' },
                ],
              },
              {
                text: 'Resources',
                items: [
                  { text: 'Queues', link: '/resources/queues.html' },
                  { text: 'Storage', link: '/resources/storage.html' },
                  { text: 'Networks', link: '/resources/networks.html' },
                  { text: 'Databases', link: '/resources/databases.html' },
                  { text: 'Caches', link: '/resources/caches.html' },
                  { text: 'Logs', link: '/resources/logs.html' },
                ],
              }
        ],
        search: {
            provider: 'local',
            options: {
                placeholder: 'Search Vapor Docs...',
            },
        }
    },
    vite: {
        server: {
            host: true,
            fs: {
                // for when developing with locally linked theme
                allow: ['../..']
            }
        },
    }
})
