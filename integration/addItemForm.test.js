describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-additemform--add-item-form-story&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

//yarn run jest:integration --updateSnapshot - обновить старый скрин новым