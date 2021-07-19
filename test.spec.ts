describe('test', () => {

    it('test me', async () => {
        const context = await global.driverService.getContext()
        const page = context.pages()[0]
        await page.goto("https://miro.com/login")
    })
})