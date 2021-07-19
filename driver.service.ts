
import {
	devices as PlaywrightDevices,
	BrowserType,
	BrowserContext,
	Browser,
	BrowserContextOptions,
	Page,
} from 'playwright'

export class DriverService {
	private pwInstance: BrowserType
	private browser?: Browser
	private contexts: BrowserContext[] = []
	private devices: typeof PlaywrightDevices


	public constructor() {
		const pw = require('playwright-chromium')
		this.pwInstance = pw['chromium']
		this.devices = pw['devices']
	}

	public async setup() {
		console.log('[Driver service] Setup start')
		this.browser = await this.pwInstance.launch({headless: false})
		console.log('[Driver service] Setup done')
	}

	public async getContext(contextOptions?: BrowserContextOptions): Promise<BrowserContext> {
		if (this.browser) {
			const context = await this.browser.newContext({})
            await context.tracing.start({screenshots: true,  snapshots: true})
			const page = await context.newPage()
			this.contexts.push(context)
			return context
		}
		throw new Error('There is no browser instance, please send stacktrace to #team_autotests')
	}

	public getDeviceContextOptions(deviceName: string) {
		return this.devices[deviceName] || {}
	}

	public getAllPagesCrossContexts() {
		const pages: Page[] = []
		this.contexts.forEach(c => pages.push(...c.pages()))
		return pages
	}

	public getContextsCount() {
		return this.contexts.length
	}

	public async clean() {
		console.log('[Driver service] Clean start')
        for(let i = 0; i < this.contexts.length; i++) {
            await this.contexts[i].tracing.stop({path: `tracing-${i}.zip`})
        }
		await Promise.all(this.contexts.map(c => c.close()))
		this.contexts = []
		console.log('[Driver service] Clean done')
	}

	public async teardown() {
		console.log('[Driver service] Tear down start')
		await this.browser?.close()
		console.log('[Driver service] Tear down done')
	}
}
