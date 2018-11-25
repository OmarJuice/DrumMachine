const bankOne = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const bankTwo = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];


let keyArr = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
let bank1 = {};
let bank2 = {}
bankOne.forEach((e, i) => {
    let audio = new Audio();
    audio.src = e.url;
    audio.name = e.id;
    audio.volume = .5;
    bank1[keyArr[i]] = audio
})
bankTwo.forEach((e, i) => {
    let audio = new Audio();
    audio.src = e.url;
    audio.name = e.id;
    audio.volume = .5
    bank2[keyArr[i]] = audio
})
$(document).ready(function () {

    let currentBank = bank1;
    let currentsound = bank1['Q'];
    let currentDisplay;
    let playing = true // modded by the powerswitch
    let buttonHighlight = {};
    $('.button').on('mousedown', function (e) {
        if (playing) {
            e.preventDefault();
            clearTimeout(currentDisplay);
            let color1 = (Math.floor(Math.random() * 10000000) + 5000000).toString(16);
            let color2 = (Math.floor(Math.random() * 10000000) + 5000000).toString(16);
            $('html').css({
                '--color': `#${color1}`,
                '--alt': `#${color2}`
            })
            clearTimeout(buttonHighlight);
            currentsound.pause()
            currentsound.currentTime = 0;
            let letter = $(this).attr('id');
            currentsound = currentBank[letter];
            currentsound.play()
            $('#display').text(currentsound.name);
            currentDisplay = setTimeout(() => {
                $('#display').text('♩♩♩');
            }, 1000);
            $(this).css({
                backgroundColor: 'var(--alt)',
                boxShadow: 'none',
                marginTop: '7%'
            })
            buttonHighlight = setTimeout(() => {
                $(this).css({
                    backgroundColor: 'rgb(41, 41, 41)',
                    boxShadow: '3px 3px var(--alt)',
                    marginTop: '5%'
                })
            }, 200);

        }
    });
    $('body').keypress(function (e) {
        let letter = String.fromCharCode(e.which).toUpperCase();
        
        if (playing && keyArr.includes(letter) ) {
            e.preventDefault();
            clearTimeout(currentDisplay);
            let color1 = (Math.floor(Math.random() * 10000000) + 5000000).toString(16);
            let color2 = (Math.floor(Math.random() * 10000000) + 5000000).toString(16);
            
            $('html').css({
                '--color': `#${color1}`,
                '--alt': `#${color2}`
            });
            clearTimeout(buttonHighlight[letter]);
            currentsound.pause() 
            currentsound.currentTime = 0;
            currentsound = currentBank[letter];
            currentsound.play()
            $('#display').text(currentsound.name);
            currentDisplay = setTimeout(() => {
                $('#display').text('♩♩♩');
            }, 1000);e

            $(`#${letter}`).css({
                backgroundColor: 'var(--alt)',
                boxShadow: 'none',
                marginTop: '7%'
            });
            buttonHighlight[letter] = setTimeout(() => {
                $(`#${letter}`).css({
                    backgroundColor: 'rgb(41, 41, 41)',
                    boxShadow: '3px 3px var(--alt)',
                    marginTop: '5%'
                })
            }, 200);
        }

    });

    $('#power').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('on');
        playing = !playing;
        clearTimeout(currentDisplay);
        if (playing) {
            $('#display').text('♩♩♩');
        }
        else if (!playing) {
            $('#display').text('OFF');
        }
    })

    $('#bank').on('click', function (e) {
        e.preventDefault();
        if (playing) {
            $(this).toggleClass('on');
            if (currentBank === bank1) {
                currentBank = bank2;
                $('#display').text('Piano-kit');
            }
            else if (currentBank === bank2) {
                currentBank = bank1;
                $('#display').text('Heater-kit');
            }
        }
    });

    $('#volume').on('change', function (e) {
        e.preventDefault();
        clearTimeout(currentDisplay);
        if (playing){
        $('#display').text(`Volume: ${$(this).val()}`);
        currentDisplay = setTimeout(() => {
            $('#display').text('♩♩♩');
        }, 1000);
        }
        for (let key in bank1) {
            bank1[key].volume = $(this).val() / 100;
        }
        for (let key in bank2) {
            bank2[key].volume = $(this).val() / 100;
        }
    });
});