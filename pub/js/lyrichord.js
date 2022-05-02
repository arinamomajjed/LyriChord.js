'use strict';


const HIDE_CHORD_SECTION_TEXT = '- hide chord section';
const SHOW_CHORD_SECTION_TEXT = '+ show chord section';

(function(global, document, $) { 
    /**
     * Class representing the general song info.
     */
    class GeneralSongInfo {
        /**
         * @param {String} [name] - The name of the song.
         * @param {String} [artist] - The name of the song.
         * @param {String} [album] - The album name of the song.
         * @param {String} [tuning='eadgbe'] - The tuning of the song.
         * @param {Number} [capo=0] - The fret number to put the capo on.
         * @param {String} [key] - The key of the song.
         * @param {String} [instrument='Guitar'] - The string instrument name of the music sheet chords (e.g. `'Guitar'`, `'Bass'`, `'Ukulele'`).
         * @description Create a general song info section.
         */
        constructor(name, artist='', album='', tuning='eadgbe', capo=0, key='', instrument='Guitar') {
            this.name = name;
            this.artist = artist;
            this.album = album;
            this.tuning = tuning;
            this.capo = capo;
            this.key = key;
            this.instrument = instrument;
        }
        /**
         * Display general song info on DOM.
         * @param {Element} [container=document.querySelector('body')] - The element object to put the display element in.
         */
        display(container=document.querySelector('body')) {
            const song_info = document.createElement('div');
            song_info.setAttribute('class', 'song-info');
            const song_name = document.createElement('h2');
            song_name.innerText = this.name;
            song_info.appendChild(song_name);
            const song_info_table = document.createElement('table');
            if (this.artist.length > 0) {
                const artist = document.createElement('tr');
                artist.innerHTML = `<th>Artist:</th><td>${this.artist}</td>`;
                song_info_table.appendChild(artist);
            }
            if (this.album.length > 0) {
                const album = document.createElement('tr');
                album.innerHTML = `<th>Album:</th><td>${this.album}</td>`;
                song_info_table.appendChild(album);
            }
            const tuning = document.createElement('tr');
            tuning.innerHTML = `<th>Tuning:</th><td>${this.tuning}</td>`;
            song_info_table.appendChild(tuning);
            if (this.capo > 0) {
                const capo = document.createElement('tr');
                capo.innerHTML = `<th>Capo:</th><td>On fret #${this.capo}</td>`;
                song_info_table.appendChild(capo);
            }
            if (this.key.length > 0) {
                const key = document.createElement('tr');
                key.innerHTML = `<th>Key:</th><td>${this.key}</td>`;
                song_info_table.appendChild(key);
            }
            if (this.instrument.length > 0) {
                const instrument = document.createElement('tr');
                instrument.innerHTML = `<th>Instrument:</th><td>${this.instrument}</td>`;
                song_info_table.appendChild(instrument);
            }
            song_info.appendChild(song_info_table);
            container.appendChild(song_info);
        }
    }
    class ChordShape {
        constructor(name='', fret_nums, barres=[], display_in_popup = true) {
            this.name = name;
            // fret_nums: Array of 6 integers.
            // 0 represents open String. -1 represents no play
            this.fret_nums = fret_nums;
            // barre: Array of Barres
            this.barres = barres;
            this.display_in_popup = display_in_popup;
        }
        strings_by_fret(fret) {
            const strings = [];
            for (let i = 0; i < this.fret_nums.length; i++) {
                if (this.fret_nums[i] === fret)
                    strings.push(i);
            }
            return strings;
        }
        generateDOM() {
            const no_play_strings = this.strings_by_fret(-1);
            const open_strings = this.strings_by_fret(0);
            const fret_notes = this.fret_nums.filter((x) => {if (x !== 0 && x !== -1) return x;}); // filter out zeros and -1 for some operations
            const start = fret_notes.length > 0 ? Math.min(...fret_notes) : 0;
            const end = fret_notes.length > 0 ? Math.max(...fret_notes) : 0;
            const chord_box = document.createElement('div');
            chord_box.className = 'chord-box';
            chord_box.setAttribute('style', `height: ${(end - start + 1) * 30}px; border-width: ${start === 1 || fret_notes.length === 0 ? '2px' : '1px'} 0px 0px 0px;`);
            // Frets
            for (let i = start; i < end + 1; i++) {
                const fret = document.createElement('div');
                fret.setAttribute('style', `width: ${100}px; height: ${30}px; border-bottom: ${'1px solid'}; position: relative;`);
                if (i in this.barres) {
                    const barre = document.createElement('div');
                    barre.setAttribute('style', `display: inline-block; width: ${100 / (this.fret_nums.length - 1) * (this.barres[i][1] - this.barres[i][0])}px; position: absolute; top: ${start === 1 || fret_notes.length === 0 ? 15 : 14}px; left: ${(this.barres[i][0] - 1) * 100 / (this.fret_nums.length - 1)}px;border-style: solid; border-width: 2px 0px 0px 0px;`);
                    fret.appendChild(barre);
                }
                // Barres
                if (i === start && start > 1) {
                    const start_indicator = document.createElement('p');
                    start_indicator.setAttribute('style', `display: inline-block; position: absolute; top: ${-12.5}px; left: 110px;`)
                    start_indicator.innerText = `${start}`;
                    fret.appendChild(start_indicator);
                }
                chord_box.appendChild(fret);
            }
            // Strings
            for (let i = 0; i < this.fret_nums.length; i++) {
                const is_open = open_strings.includes(i);
                const is_mute = no_play_strings.includes(i);
                const sign = document.createElement('p');
                sign.innerText = `${is_open ? 'O': is_mute ? 'X' : '*'}`;
                sign.setAttribute('style', `display: inline-block; font-color: ${!is_open && !is_mute ? 'white' : 'black'}; position: relative; left: 0px;  margin-bottom: 0px; top: -30px;`); // fix left-offset later
                const string = document.createElement('div');
                string.appendChild(sign);
                string.setAttribute('style', `display: inline-block; width: 0px; height: ${(end - start + 1) * 30 + (end - start)}px; border: 0.5px solid; position: absolute; left: ${(100 )/ (this.fret_nums.length - 1) * i - 0.5}px; top: 0px;`);
                const single_note_num = this.fret_nums[i];
                // Single notes
                if (single_note_num !== 0 && single_note_num !== -1) {
                    const single_note = document.createElement('div');
                    single_note.setAttribute('style', `display: inline-block; width: 10px; height: 10px; background-color: black; border-radius: 50%; position: absolute; vertical-align: middle; left: -5px; top: ${(single_note_num - start) * 30 + 10 + single_note_num - start}px;`)
                    string.appendChild(single_note);
                }
                chord_box.appendChild(string);
            }
            return chord_box;
        }
    }
    /**
     * Class representing a Chord object.
     */
    class Chord {
        /**
         * @param {String} [name] - The name of the chord.
         * @param {Array<Number>} fret_nums - The fret number representation of the primary shape of 6hechord, i.e. `n_i` represents which fret to hold for string `i`.<ul><li>`n_i = 0` represents open string.</li><li>`n_i = -1` represents mute string.</li><li>`n_i > 0` represents fret number to hold on string `i`.</li><li><strong>`fret_nums.length` = number of strings on corresponding instrument</strong></li>/ul>
         * @param {Object<Number, Array<Number>>} [barres] - The barres on the primary shape of the chord with the key as the fret number and the value array as `[start_string , end_string]`.<ul><li>starting form the most top string on instrument (1) to the most bottom string (this.fret_nums.length)</li><li>where `start_string > 0` and `end_string > start_string`<br/>and `end_string <= fret_nums.length`</li><li>e.g. `{5: [2, 4]}` represents a barre on fret 5 covering strings #2 to #4.</li></ul>
         * @param {Boolean} [display_in_popup=true] - Boolean representing the initial indication of whether the chord should be displayed as popup.
         */
        constructor(name='', fret_nums, barres=[], display_in_popup = true) {
            this.shapes = [new ChordShape(name, fret_nums, barres, display_in_popup)]
        }
        /**
         * Add additional chord shape to a `Chord` to display on pages of chord's carousel.
         * @param {Array<Number>} fret_nums - The fret number representation of the chord, i.e. `n_i` represents which fret to hold for string `i`.<ul><li>`n_i = 0` represents open string.</li><li>`n_i = -1` represents mute string.</li><li>`n_i > 0` represents fret number to hold on string `i`.</li><li><strong>`fret_nums.length` = number of strings on corresponding instrument</strong></li></ul>
         * @param {Object<Number, Array<Number>>} [barres] - The barres on the chord with the key as the fret number and the value array as<br/>`[start_string , end_string]`.<ul><li>starting form the most top string on instrument (1) to the most bottom string (this.fret_nums.length)</li><li>where `start_string > 0` and `end_string > start_string`<br/>and `end_string <= fret_nums.length`</li><li>e.g. `{5: [2, 4]}` represents a barre on fret 5 covering strings #2 to #4.</li></ul>
         */
        add_shape(fret_nums, barres=[]) {
            const new_shape = new ChordShape(this.shapes[0].name, fret_nums, barres, this.shapes[0].barres, this.shapes[0].display_in_popup);
            this.shapes.push(new_shape);
        }
        /**
         * Display chord on DOM.
         * @param {Element} [container=document.querySelector('body')] - The element object to put the display element in.
         * @param {Boolean} [chords_section=false] - Boolean indicating whether it is being displayed on the song chords section of the song sheet (since they are formatted differently)
         * @param {Boolean} [popup] - Boolean indicating whether the chord should be displayed as a popup.
         */
        display(container=document.querySelector('body'), chords_section=false, popup=this.shapes[0].display_in_popup) {
            const chord_box_container = document.createElement('div');
            chord_box_container.className = chords_section ? 'chord-box-container-margined' : 'chord-box-container';
            const chords = [];
            this.shapes.map((chord) => {
                chords.push(chord.generateDOM());
            });
            if (popup && !chords_section) {
                const chord_name = document.createElement('div');
                chord_name.className = 'popup-description';
                const chord_name_text = document.createElement('span');
                chord_name_text.className = 'chord-name-text';
                chord_name_text.innerText = this.shapes[0].name;
                chord_name.appendChild(chord_name_text);
                chord_box_container.className = 'popup';
                chord_name.appendChild(chord_box_container);
                container.appendChild(chord_name);
            } else {
                const chord_name = document.createElement('div');
                chord_name.setAttribute('style', 'font-weight: bold; position: relative; top: -20px;')
                chord_name.innerText = this.shapes[0].name;
                chord_box_container.appendChild(chord_name);
                container.appendChild(chord_box_container);
            }
            if (this.shapes.length > 1) {
                const chords_carousel = document.createElement('div');
                chords_carousel.className = 'carousel';
                const carousel_toggle_menu = document.createElement('div');
                carousel_toggle_menu.className = 'carousel-toggle-menu';
                const carousel_pages_list = [];
                const carousel_toggles_list = [];
                for (let i = 0; i < chords.length; i++) {
                    const carousel_page = document.createElement('div');
                    carousel_page.className = 'carousel-page';
                    carousel_page.appendChild(chords[i]);
                    const carousel_toggle = document.createElement('span');
                    carousel_toggle.className = 'carousel-toggle';
                    if (i == 0) {
                        carousel_page.classList.add('carousel-page-current');
                        carousel_toggle.classList.add('carousel-toggle-current');
                    }
                    carousel_pages_list.push(carousel_page);
                    carousel_toggles_list.push(carousel_toggle);
                }
                for (let i = 0; i < carousel_toggles_list.length; i++) {
                    carousel_toggles_list[i].addEventListener('click', () => {
                        for (let j = 0; j < carousel_pages_list.length; j++) {
                            carousel_pages_list[j].classList.remove('carousel-page-current');
                            carousel_toggles_list[j].classList.remove('carousel-toggle-current');
                        }
                        carousel_pages_list[i].classList.add('carousel-page-current');
                        carousel_toggles_list[i].classList.add('carousel-toggle-current');
                    });
                    carousel_toggle_menu.appendChild(carousel_toggles_list[i]);
                    chords_carousel.appendChild(carousel_pages_list[i]);
                }
                chords_carousel.appendChild(carousel_toggle_menu);
                chord_box_container.appendChild(chords_carousel);
            } else {
                chord_box_container.appendChild(chords[0]);
            }
        }
    }

    /**
     * Class representing the lyric-chord pair objects of the song sheet. In terms of representation, the chord part in the pair is to be played together with the text part.
     */
    class LyricChordPair {
        /**
         * @param {String} [text] - The lyrical part of the pair.
         * @param {Chord} [chord] - The chord part of the pair.
         */
        constructor(text=null, chord=null) {
            this.text = text;
            this.chord = chord;
        }
        /**
         * Display the lyric-chord pair on DOM.
         * @param {Element} [container=document.querySelector('body')] - The element object to put the display element in.
         * @param {Boolean} [format_single_chord=false] - Format the corresponding chord's display on the song sheet.<br/>e.g. for instrumental portion of a non instrumental song
         * @param {Boolean} [popup=false] - Boolean indicating whether the corresponding chord should be displayed as popup.
         */
        display(container=document.querySelector('body'), format_single_chord=false, popup=null) {
            const pair = document.createElement('div');
            pair.setAttribute('style', 'display: inline-block;');
            if (this.chord !== null) {
                const chord = document.createElement('div');
                if (popup === null) {
                        this.chord.display(chord);
                } else {
                    this.chord.display(chord, false, popup);
                }
                pair.appendChild(chord);
                if (this.text === null && format_single_chord) {
                    const text = document.createElement('p');
                    text.innerHTML = '.';
                    pair.appendChild(text);
                }
            }
            if (this.text !== null) {
                const text = document.createElement('p');
                text.innerHTML = this.text;
                pair.appendChild(text);
            }
            container.appendChild(pair);

        }
    }

    /**
     * Class representing a line of lyric-chord pairs.
     */
    class LyricChordLine {
        /**
         * @param {Array<LyricChordPair>} pairs - Array of lyric-chord pairs to be displayed togehter on the line.
         */
        constructor(pairs) {
            this.pairs = pairs;
        }
        /**
         * Add a lyric-chord pair to the line object.
         * @param {LyricChordPair} pair - The lyric-chord pair to be added.
         */
        addPair(pair) {
            this.pairs.push(pair);
        }
        /**
         * Display lyric-chord line on DOM.
         * @param {Element} [container=document.querySelector('body')] - The element object to put the display element in.
         * @param {Boolean} [popup=null] - Boolean indicating whether the chords of the lyric-chord pairs on the line should be displayed as a popup.
         */
        display(container=document.querySelector('body'), popup=null) {
            const line = document.createElement('div');
            let  chord_only_count = 0;
            for (let i = 0; i < this.pairs.length; i++) {
                if (this.pairs[i].text === null) {
                    chord_only_count++;
                }
            }
            for (let i = 0; i < this.pairs.length; i++) {
                if (this.pairs[i].text === null && chord_only_count < this.pairs.length) {
                    if (popup === null) {
                        this.pairs[i].display(line, true);
                    } else {
                        this.pairs[i].display(line, true, popup);
                    }
                } else {
                    if (popup === null) {
                        this.pairs[i].display(line);
                    } else {
                        this.pairs[i].display(line, false, popup);
                    }
                }
                const space = document.createElement('span');
                space.innerText = ' ';
                if (i < this.pairs.length - 1) {
                    line.appendChild(space);
                }
            }
            container.appendChild(line);
        }
    }

    /**
     * Class representing a group of lyric-chord lines.
     */
    class LyricChordGroup {
        /**
         * @param {String} [title] - Name of the lyric-chord group (e.g. `'CHORUS'`, `'SOLO'`, etc.)
         * @param {Array<LyricChordLine>} lines - Array of lyric-chord lined to be displayed togehter in the group.
         */
        constructor(title='', lines) {
            this.title=title;
            this.lines = lines;
        }
        /**
         * Add a lyric-chord line to the line object.
         * @param {LyricChordLine} line - The lyric-chord line to be added.
         */
        addLine(line) {
            this.lines.push(line);
        }
        /**
         * Display lyric-chord group on DOM.
         * @param {Element} [container=document.querySelector('body')] - The element object to put the display element in.
         * @param {Boolean} [popup=null] - Boolean indicating whether the chords of the lyric-chord pairs on the lines of the group should be displayed as a popup.
         */
        display(container=document.querySelector('body'), popup=null) {
            const group = document.createElement('div');
            group.setAttribute('style', 'padding: 0.5em;')
            if (this.title.length > 0) {
                const title = document.createElement('p');
                title.innerText = `[${this.title}]`;
                group.appendChild(title);
            }
            for (let i = 0; i < this.lines.length; i++) {
                if (popup === null) {
                    this.lines[i].display(group);
                } else {
                    this.lines[i].display(group, popup);
                }
            }
            container.appendChild(group);
        }
    }


    /**
     * Class representing the song content portion of the song sheet (lyrics and chords).
     */
    class SongContent {
        /**
         * @param {Array<LyricChordGroup>} groups - Array of lyric-chord groups of the song content.
         */
        constructor(groups) {
            this.groups = groups;
        }
        /**
         * Generates and returns the DOM element of the song content.
         * @param {Boolean} [popup=null] - Boolean indicating whether the chords in the song content should be displayed as popups.
         * @returns {Element}
         */
        generateDOM(popup=null) {
            const content = document.createElement('div');
            content.className = 'song-content-dom';
            for (let i = 0; i < this.groups.length; i++) {
                if (popup === null) {
                    this.groups[i].display(content);
                } else {
                    this.groups[i].display(content, popup);
                }
            }
            return content;
        }
        /**
         * Display song content on DOM.
         * @param {Element} [container=document.querySelector('body')] - The element object to put the display element in.
         * @param {Boolean} [popup=null] - Boolean indicating whether the chords of the song content should be displayed as a popup.
         */
        display(container=document.querySelector('body'), popup=null) {
            const content = this.generateDOM(popup);
            container.appendChild(content);
        }
    }


    /**
     * Class representing the song sheet object.
     */
    class SongSheet {
        /**
         * @param {GeneralSongInfo} song_info - General song info part of the song.
         * @param {SongContent} song_content - Song content part of the song.
         * @param {Boolean} [display_all_chords=true] - Option to have a section on the song sheet to display all chords together.
         * @param {Boolean} [popup_format=true] - Boolean indicating whether the chords of the song should be displayed as popups.
         */
        constructor(
            song_info=null,
            song_content=null,
            display_all_chords=true,
            popup_format=true,
        ) {
            this.song_info = song_info;
            this.song_content = song_content;
            this.display_all_chords = display_all_chords;
            this.popup_format=popup_format;
        }
        /**
         * Returns the dom element of the chord section or null if there are no chords in the song.
         * @returns {Element|null}
         */
        display_chords() {
            const chords_container = document.createElement('div');
            chords_container.className = 'chords-section'
            const chords = []
            for (let i = 0; i < this.song_content.groups.length; i++) {
                for (let j = 0; j < this.song_content.groups[i].lines.length; j++) {
                    for (let k = 0; k < this.song_content.groups[i].lines[j].pairs.length; k++) {
                        const chord = this.song_content.groups[i].lines[j].pairs[k].chord;
                        const exists = chords.filter(c => c !== null && chord !== null && c.shapes[0].name === chord.shapes[0].name && JSON.stringify(c.shapes[0].fret_nums) === JSON.stringify(chord.shapes[0].fret_nums) && JSON.stringify(c.shapes[0].barres) === JSON.stringify(chord.shapes[0].barres));
                        if (exists.length === 0 && chord !== null) {
                            chords.push(chord);
                        }
                    }
                }
            }
            chords.map((chord) => {
                if (chord !== null) {
                    chord.display(chords_container, true);
                }
            });
            if (chords.length > 0) {
                // song_sheet.appendChild(chords_container);
                return chords_container;
            }
            return null;
        }
        /**
         * Display song sheet on DOM
         * @param {Element} [container=document.querySelector('body')] - The element object to put the display element in.
         */
        display(container=document.querySelector('body')) {
            const song_sheet = document.createElement('div');
            song_sheet.setAttribute('style', 'margin: 1em; padding: 1em;');
            if (this.song_info !== null) {
                this.song_info.display(song_sheet);
            }
            if (this.display_all_chords) {
                const all_chords = this.display_chords();
                all_chords.className = 'chords-section';
                all_chords.classList.add('display-block');
                const section_width = all_chords.children.length < 4 ? 150 * all_chords.children.length : 4 * 150;
                if (all_chords !== null) {
                    const chord_section_container = document.createElement('div');
                    chord_section_container.className = 'chord-section-container';
                    chord_section_container.setAttribute('style', `width: ${section_width}px;`);
                    const toggle_chord_section = document.createElement('span');
                    toggle_chord_section.className = 'toggle-chord-section-hide';
                    toggle_chord_section.innerText = HIDE_CHORD_SECTION_TEXT;
                    toggle_chord_section.addEventListener('click', () => {
                        if (toggle_chord_section.classList.contains('toggle-chord-section-hide')) {
                            toggle_chord_section.classList.remove('toggle-chord-section-hide');
                            toggle_chord_section.classList.add('toggle-chord-section-show');
                            toggle_chord_section.innerText = SHOW_CHORD_SECTION_TEXT;
                            all_chords.classList.remove('display-block');
                            all_chords.classList.add('display-none');
                        } else if (toggle_chord_section.classList.contains('toggle-chord-section-show')) {
                            toggle_chord_section.classList.remove('toggle-chord-section-show');
                            toggle_chord_section.classList.add('toggle-chord-section-hide');
                            toggle_chord_section.innerText = HIDE_CHORD_SECTION_TEXT;
                            all_chords.classList.remove('display-none');
                            all_chords.classList.add('display-block');
                        }
                    });
                    chord_section_container.appendChild(toggle_chord_section);
                    chord_section_container.appendChild(all_chords);
                    song_sheet.appendChild(chord_section_container);
                }

            }

            if (this.song_content !== null) {
                const popup_checkbox = document.createElement('div');
                popup_checkbox.setAttribute('style', 'text-align: left;');
                const label = document.createElement('label');
                label.setAttribute('style', 'color: dimgray; font-size: small; font-weight: bold;')
                label.innerText = 'display chords as popups';
                const input = document.createElement('input');
                input.setAttribute('type', 'checkbox');
                if (this.popup_format) {
                    input.setAttribute('checked', String.Empty);
                }

                const song_content_dom = this.song_content.generateDOM(this.popup_format);
                popup_checkbox.appendChild(input);
                popup_checkbox.appendChild(label);
                song_sheet.appendChild(popup_checkbox);
                song_sheet.appendChild(song_content_dom);
                input.addEventListener('change', () => {
                    if (this.popup_format) {
                        this.popup_format = false;
                        input.removeAttribute('checked');
                        song_sheet.removeChild(song_sheet.querySelector('.song-content-dom'));
                        song_sheet.appendChild(this.song_content.generateDOM(this.popup_format));
                    } else {
                        this.popup_format = true;
                        input.setAttribute('checked', String.Empty);
                        song_sheet.removeChild(song_sheet.querySelector('.song-content-dom'));
                        song_sheet.appendChild(this.song_content.generateDOM(this.popup_format));
                    }
                });
            }
            container.appendChild(song_sheet);
        }
    }
    global.GeneralSongInfo = global.GeneralSongInfo || GeneralSongInfo;
    global.Chord = global.Chord || Chord;
    global.LyricChordGroup = global.LyricChordGroup || LyricChordGroup;
    global.LyricChordPair = global.LyricChordPair || LyricChordPair;
    global.LyricChordLine = global.LyricChordLine || LyricChordLine;
    global.SongContent = global.SongContent || SongContent;
    global.SongSheet = global.SongSheet || SongSheet;

})(window, window.document, $);