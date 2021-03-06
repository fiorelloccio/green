class langManager {

    constructor(options) {
        this._pattern = options.pattern;
        this._lang = options.defLang;
        this.defTranslate = options.defTranslate;
        this.loadLang();
    }


    set language(lang) {
        this._lang = lang;
        this.loadLang();
    }

    get language() {
        return this._lang;
    }

    loadLang () {
      console.log('load')
      $.ajax({
        url: this._pattern + this._lang + '.json',
        method: 'POST',
        dataType: 'json',
        async: false
      })
      .done(data => {
        console.log(data)
        this.data = data;

        if(this.defTranslate === true) {
          this.translate();
        }

      })
      .fail(error => {
        throw 'Error: ' + error;
      });
    }

    translate(options) {
      if(options !== undefined) {

        options.forEach(key => {
          if(key in this.data) {
            $('[content=' + key + ']').html(this.data[key]);
          } else {
            throw "Error: content " + key + " doesn't exists";
          }
        });
      } else {
        $.each(this.data, (key, val) => {
          $('[content=' + key + ']').html(val);
        });
      }

    }
};