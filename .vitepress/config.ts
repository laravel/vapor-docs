import { defineConfigWithTheme } from "vitepress";
import type { ThemeConfig } from 'pilgrim-theme'
import config from 'pilgrim-theme/config'

export default defineConfigWithTheme<ThemeConfig>({
    extends: config,
    title: 'Laravel Vapor',
    description: 'Laravel at Infinite Scale',
    base: '/',
    cleanUrls: true,
    srcDir: 'src',

    themeConfig: {
        logo: {
            light: '/logo.svg',
            dark: '/logo.svg',
        },
        nav: [
            { text: 'Laravel Vapor', link: 'https://vapor.laravel.com' },
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
                  { text: 'Environments', link: '/projects/environments' },
                  { text: 'Deployments', link: '/projects/deployments' },
                  { text: 'Development', link: '/projects/development' },
                  { text: 'Domains', link: '/projects/domains' },
                  { text: 'Troubleshooting', link: '/projects/troubleshooting' },
                ],
              },
              {
                text: 'Resources',
                items: [
                  { text: 'Queues', link: '/resources/queues' },
                  { text: 'Storage', link: '/resources/storage' },
                  { text: 'Networks', link: '/resources/networks' },
                  { text: 'Databases', link: '/resources/databases' },
                  { text: 'Caches', link: '/resources/caches' },
                  { text: 'Logs', link: '/resources/logs' },
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
