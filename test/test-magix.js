import {Magix} from "../src/magix";
import {Message} from "../src/message";

describe('Magix', function () {
    describe('#observe()', function () {
        it('should get without error', function (done) {
            const magix = new Magix('http://localhost:8080')
            magix.observe()
                .subscribe(msg => console.log(msg))

            setTimeout(() => {
                done()
            }, 3000)
        });
    });

    describe('#observe() and broadcast()', function () {
        it('should get without error', function (done) {
            const magix = new Magix('http://localhost:8080')
            magix.observe()
                .subscribe(msg => console.log(msg))

            magix.broadcast(new Message({id: +new Date()}))

            setTimeout(() => {
                done()
            }, 3000)
        });
    });
});