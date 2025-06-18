export function numberToWord(n, lang = 'en') {
	if (parseInt(n) === 0) {
		return lang === 'uk' ? 'Менше одного року' : 'Less than one year';
	}

	const units_en = [
		'',
		'One',
		'Two',
		'Three',
		'Four',
		'Five',
		'Six',
		'Seven',
		'Eight',
		'Nine',
		'Ten',
		'Eleven',
		'Twelve',
		'Thirteen',
		'Fourteen',
		'Fifteen',
		'Sixteen',
		'Seventeen',
		'Eighteen',
		'Nineteen',
	];
	const tens_en = [
		'',
		'',
		'Twenty',
		'Thirty',
		'Forty',
		'Fifty',
		'Sixty',
		'Seventy',
		'Eighty',
		'Ninety',
	];

	const units_uk = [
		'',
		'Один',
		'Два',
		'Три',
		'Чотири',
		'П’ять',
		'Шість',
		'Сім',
		'Вісім',
		'Дев’ять',
		'Десять',
		'Одинадцять',
		'Дванадцять',
		'Тринадцять',
		'Чотирнадцять',
		'П’ятнадцять',
		'Шістнадцять',
		'Сімнадцять',
		'Вісімнадцять',
		'Дев’ятнадцять',
	];
	const tens_uk = [
		'',
		'',
		'Двадцять',
		'Тридцять',
		'Сорок',
		'П’ятдесят',
		'Шістдесят',
		'Сімдесят',
		'Вісімдесят',
		'Дев’яносто',
	];

	const units = lang === 'uk' ? units_uk : units_en;
	const tens = lang === 'uk' ? tens_uk : tens_en;

	const string = n.toString();
	const chunks = [];

	let chunkStr = string;
	while (chunkStr.length > 0) {
		chunks.push(chunkStr.slice(-3));
		chunkStr = chunkStr.slice(0, -3);
	}

	let words = [];
	chunks.forEach((chunk, index) => {
		const ints = chunk.split('').reverse().map(Number);

		if (ints[1] === 1) {
			ints[0] += 10;
		}

		if (ints[0]) {
			words.push(units[ints[0]]);
		}
		if (ints[1] && ints[1] !== 1) {
			words.push(tens[ints[1]]);
		}
		if (ints[2]) {
			words.push(
				lang === 'uk' ? `${units[ints[2]]} сотень` : `${units[ints[2]]} hundred`
			);
		}
	});

	words = words.reverse();
	if (!words.length) return lang === 'uk' ? 'Невідомо' : 'Unknown';
	if (words.join(' ') === (lang === 'uk' ? 'Один' : 'One')) {
		return lang === 'uk' ? 'Один рік' : 'One year';
	}

	return lang === 'uk'
		? `${words.join(' ')} років`
		: `${words.join(' ')} years`;
}
