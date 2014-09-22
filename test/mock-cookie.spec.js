define(['mock-cookie'], function (MockCookie) {

    describe('Mock Cookie', function () {

        var mockDocument = {
            location: {
                pathname: '/',
                hostname: 'www.example.com'
            }
        };

        it('should be able to instantiate', function () {
            expect(new MockCookie()).toBeDefined();
        });

        it('should be able to add a cookie', function () {
            var mockCookie = new MockCookie(mockDocument);
            mockCookie.cookie = 'key=value';
            expect(mockCookie.cookie).toBe('key=value; path=/; domain=www.example.com');
        });

        it('should be able to add multiple cookies', function () {
            var mockCookie = new MockCookie(mockDocument);
            mockCookie.cookie = 'key-one=value';
            mockCookie.cookie = 'key-two=value';
            expect(mockCookie.cookie).toBe(
                'key-one=value; path=/; domain=www.example.com; key-two=value; path=/; domain=www.example.com'
            );
        });

        it('cookies should be unique', function () {
            var mockCookie = new MockCookie(mockDocument);
            mockCookie.cookie = 'key=value-one';
            mockCookie.cookie = 'key=value-two';
            expect(mockCookie.cookie).toBe('key=value-two; path=/; domain=www.example.com');
        });

        it('cookies should be unique by path', function () {
            var mockCookie = new MockCookie(mockDocument);
            mockCookie.cookie = 'key=value; path=/';
            mockCookie.cookie = 'key=value; path=/foo';
            expect(mockCookie.cookie).toBe(
                'key=value; path=/; domain=www.example.com; key=value; path=/foo; domain=www.example.com'
            );
        });

        it('cookies should be unique by path', function () {
            var mockCookie = new MockCookie(mockDocument);
            mockCookie.cookie = 'key=value; domain=www.example1.com';
            mockCookie.cookie = 'key=value; domain=www.example2.com';
            expect(mockCookie.cookie).toBe(
                'key=value; domain=www.example1.com; path=/; key=value; domain=www.example2.com; path=/'
            );
        });

    });

});
