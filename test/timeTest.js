const assert = require("assert");
const moment = require("moment-timezone");
const sinon = require("sinon");

const time = require("../reactions/time.js");

describe("time processor", (done) => {

	it("canProcess", () => {
		assert.equal(time.canProcess({content: "1pm"}), true, "1pm");
		assert.equal(time.canProcess({content: "1 pm"}), true, "1 pm");
		assert.equal(time.canProcess({content: "1PM"}), true, "1PM");
		assert.equal(time.canProcess({content: "1 PM"}), true, "1 PM");
		assert.equal(time.canProcess({content: "1:30pm"}), true, "1:30pm");
		assert.equal(time.canProcess({content: "1:30 pm"}), true, "1:30 pm");
		assert.equal(time.canProcess({content: "1:30PM"}), true, "1:30PM");
		assert.equal(time.canProcess({content: "1:30 PM"}), true, "1:30 PM");
		assert.equal(time.canProcess({content: "1:30 nope"}), false, "1:30 nope");
		assert.equal(time.canProcess({content: "nope nope"}), false, "nope nope");
	});

	it("process - no edits to be made, no edits made", (done) => {
		testMessage('asdf asdf pm asdf 1:30', 'asdf asdf pm asdf 1:30', done);
	});

	it("process - edits message with updated timezone - EDT", (done) => {
		let clock = sinon.useFakeTimers(new Date(2018, 9, 27).getTime());
		testMessage('9am 9am 10 PM 11:30 PM', '9am EDT (UTC-04:00) 9am EDT (UTC-04:00) 10 PM EDT (UTC-04:00) 11:30 PM EDT (UTC-04:00)', done);
		clock.tick(101);
	});

	it("process - edits message with updated timezone - EST", (done) => {
		let clock = sinon.useFakeTimers(new Date(2018, 11, 15).getTime());
		testMessage('9am 9am 10 PM 11:30 PM', '9am EST (UTC-05:00) 9am EST (UTC-05:00) 10 PM EST (UTC-05:00) 11:30 PM EST (UTC-05:00)', done);
		clock.tick(101);
	});

	const testMessage = (content, expectedContent, done) => {
		let message = new MessageMock(content);

		time.process(message);

		setTimeout(() => {
			assert.equal(message.newContent, expectedContent);
			done();
		}, 100);
	};

	class MessageMock {
		constructor(content) {
			this.content = content;
			this.newContent = null;
		}

		edit(newContent) {
			this.newContent = newContent;
		}
	}
});
