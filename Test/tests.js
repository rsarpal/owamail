

fixture `Test REST API`;

test('Initiate Auth', async t => {
    const response = await getAuthResponseData();
    await t
        .expect(response.statusCode).eql(200);
});
