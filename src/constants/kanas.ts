export type GetKanasOptions = {
  withDakuten: boolean;
  withHandakuten: boolean;
  inverted: boolean;
};

export default class Kanas {
  static alphabetOrder = [
    ['a', 'i', 'u', 'e', 'o'],
    ['ka', 'ki', 'ku', 'ke', 'ko'],
    ['ga', 'gi', 'gu', 'ge', 'go'],
    ['sa', 'shi', 'su', 'se', 'so'],
    ['za', 'ji', 'zu', 'ze', 'zo'],
    ['ta', 'chi', 'tsu', 'te', 'to'],
    ['da', 'ji', 'zu', 'de', 'do'],
    ['na', 'ni', 'nu', 'ne', 'no'],
    ['ha', 'hi', 'fu', 'he', 'ho'],
    ['ba', 'bi', 'bu', 'be', 'bo'],
    ['pa', 'pi', 'pu', 'pe', 'po'],
    ['ma', 'mi', 'mu', 'me', 'mo'],
    ['ya', '', 'yu', '', 'yo'],
    ['ra', 'ri', 'ru', 're', 'ro'],
    ['wa', '', '', '', 'wo'],
    ['', '', '', '', 'n'],
  ];

  // ======================== HIRAGANAS ========================
  static hiraganaBase = new Map([
    ['あ', 'a'],
    ['い', 'i'],
    ['う', 'u'],
    ['え', 'e'],
    ['お', 'o'],
    ['か', 'ka'],
    ['き', 'ki'],
    ['く', 'ku'],
    ['け', 'ke'],
    ['こ', 'ko'],
    ['さ', 'sa'],
    ['し', 'shi'],
    ['す', 'su'],
    ['せ', 'se'],
    ['そ', 'so'],
    ['た', 'ta'],
    ['ち', 'chi'],
    ['つ', 'tsu'],
    ['て', 'te'],
    ['と', 'to'],
    ['な', 'na'],
    ['に', 'ni'],
    ['ぬ', 'nu'],
    ['ね', 'ne'],
    ['の', 'no'],
    ['は', 'ha'],
    ['ひ', 'hi'],
    ['ふ', 'fu'],
    ['へ', 'he'],
    ['ほ', 'ho'],
    ['ま', 'ma'],
    ['み', 'mi'],
    ['む', 'mu'],
    ['め', 'me'],
    ['も', 'mo'],
    ['や', 'ya'],
    ['ゆ', 'yu'],
    ['よ', 'yo'],
    ['ら', 'ra'],
    ['り', 'ri'],
    ['る', 'ru'],
    ['れ', 're'],
    ['ろ', 'ro'],
    ['わ', 'wa'],
    ['を', 'wo'],
    ['ん', 'n'],
  ]);

  static hiraganaDakuten = new Map([
    ['が', 'ga'],
    ['ぎ', 'gi'],
    ['ぐ', 'gu'],
    ['げ', 'ge'],
    ['ご', 'go'],
    ['ざ', 'za'],
    ['じ', 'ji'],
    ['ず', 'zu'],
    ['ぜ', 'ze'],
    ['ぞ', 'zo'],
    ['だ', 'da'],
    ['ぢ', 'ji'],
    ['づ', 'zu'],
    ['で', 'de'],
    ['ど', 'do'],
    ['ば', 'ba'],
    ['び', 'bi'],
    ['ぶ', 'bu'],
    ['べ', 'be'],
    ['ぼ', 'bo'],
  ]);

  static hiraganaHandakuten = new Map([
    ['ぱ', 'pa'],
    ['ぴ', 'pi'],
    ['ぷ', 'pu'],
    ['ぺ', 'pe'],
    ['ぽ', 'po'],
  ]);

  // ======================== KATAKANAS ========================
  static katakanaBase = new Map([
    ['ア', 'a'],
    ['イ', 'i'],
    ['ウ', 'u'],
    ['エ', 'e'],
    ['オ', 'o'],
    ['カ', 'ka'],
    ['キ', 'ki'],
    ['ク', 'ku'],
    ['ケ', 'ke'],
    ['コ', 'ko'],
    ['サ', 'sa'],
    ['シ', 'shi'],
    ['ス', 'su'],
    ['セ', 'se'],
    ['ソ', 'so'],
    ['タ', 'ta'],
    ['チ', 'chi'],
    ['ツ', 'tsu'],
    ['テ', 'te'],
    ['ト', 'to'],
    ['ナ', 'na'],
    ['ニ', 'ni'],
    ['ヌ', 'nu'],
    ['ネ', 'ne'],
    ['ノ', 'no'],
    ['ハ', 'ha'],
    ['ヒ', 'hi'],
    ['フ', 'fu'],
    ['ヘ', 'he'],
    ['ホ', 'ho'],
    ['マ', 'ma'],
    ['ミ', 'mi'],
    ['ム', 'mu'],
    ['メ', 'me'],
    ['モ', 'mo'],
    ['ヤ', 'ya'],
    ['ユ', 'yu'],
    ['ヨ', 'yo'],
    ['ラ', 'ra'],
    ['リ', 'ri'],
    ['ル', 'ru'],
    ['レ', 're'],
    ['ロ', 'ro'],
    ['ワ', 'wa'],
    ['ヲ', 'wo'],
    ['ン', 'n'],
  ]);

  static katakanaDakuten = new Map([
    ['ガ', 'ga'],
    ['ギ', 'gi'],
    ['グ', 'gu'],
    ['ゲ', 'ge'],
    ['ゴ', 'go'],
    ['ザ', 'za'],
    ['ジ', 'ji'],
    ['ズ', 'zu'],
    ['ゼ', 'ze'],
    ['ゾ', 'zo'],
    ['ダ', 'da'],
    ['ヂ', 'ji'],
    ['ヅ', 'zu'],
    ['デ', 'de'],
    ['ド', 'do'],
    ['バ', 'ba'],
    ['ビ', 'bi'],
    ['ブ', 'bu'],
    ['ベ', 'be'],
    ['ボ', 'bo'],
  ]);

  static katakanaHandakuten = new Map([
    ['パ', 'pa'],
    ['ピ', 'pi'],
    ['プ', 'pu'],
    ['ペ', 'pe'],
    ['ポ', 'po'],
  ]);

  // ======================== METHODS ========================
  private static invert(map: Map<string, string>): Map<string, string> {
    return new Map([...map.entries()].map(([k, v]) => [v, k]));
  }

  static getHiraganas({
    withDakuten,
    withHandakuten,
    inverted,
  }: GetKanasOptions): Map<string, string> {
    const result = new Map(this.hiraganaBase);

    if (withDakuten) this.hiraganaDakuten.forEach((v, k) => result.set(k, v));

    if (withHandakuten) this.hiraganaHandakuten.forEach((v, k) => result.set(k, v));

    return inverted ? this.invert(result) : result;
  }

  static getKatakanas({
    withDakuten,
    withHandakuten,
    inverted,
  }: GetKanasOptions): Map<string, string> {
    const result = new Map(this.katakanaBase);

    if (withDakuten) this.katakanaDakuten.forEach((v, k) => result.set(k, v));

    if (withHandakuten) this.katakanaHandakuten.forEach((v, k) => result.set(k, v));

    return inverted ? this.invert(result) : result;
  }

  static getKanas({ withDakuten, withHandakuten, inverted }: GetKanasOptions): Map<string, string> {
    const result = new Map();

    this.getHiraganas({ withDakuten, withHandakuten, inverted: false }).forEach((v, k) =>
      result.set(k, v),
    );

    this.getKatakanas({ withDakuten, withHandakuten, inverted: false }).forEach((v, k) =>
      result.set(k, v),
    );

    return inverted ? this.invert(result) : result;
  }
}
