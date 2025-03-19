/* 課題に関するコードを以下に書く */
var instruction = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="text-align: center;">
      <img src="fisherman-task/stimuli/fish_instruction.png" width="500px">
    </div>
    <p style='text-align:left'>
      湖Aには，ニジマス（赤い線のある魚）が８割，ワカサギ（色の薄い魚）が２割います。<br>
      湖Bには，ニジマスが２割，ワカサギが８割います。<br>
      これから釣り人が釣った魚を見せます。あなたは釣り人がどちらの湖で魚を釣っているのかを推測してください。<br><br>
      釣り人がどちらの湖で釣っているのかについて、どのくらい湖Aで釣りをしているのか、スライダーを動かして確率(%)で示して下しください。<br>
      高い確率を選択すると湖Aで釣っている確率が高いということになります。低い確率を選択すると湖Aではなく湖Bで釣っている確率が高いという意味になります。<br>
      なお，釣り人は釣った魚はもとの湖に戻しますので、湖Aと湖Bの魚の割合は変わりません。
    </p>`,
  choices: ['次へ進む'],
};



/*刺激の設定*/
var stimuli = [
  {stimulus: 'fisherman-task/stimuli/fish01.png', fish_dominant: 1},
  {stimulus: 'fisherman-task/stimuli/fish02.png', fish_dominant: 1},
  {stimulus: 'fisherman-task/stimuli/fish03.png', fish_dominant: 1},
  {stimulus: 'fisherman-task/stimuli/fish04.png', fish_dominant: 0},
  {stimulus: 'fisherman-task/stimuli/fish05.png', fish_dominant: 1},
  {stimulus: 'fisherman-task/stimuli/fish06.png', fish_dominant: 1},
  {stimulus: 'fisherman-task/stimuli/fish07.png', fish_dominant: 1},
  {stimulus: 'fisherman-task/stimuli/fish08.png', fish_dominant: 1},
  {stimulus: 'fisherman-task/stimuli/fish09.png', fish_dominant: 0},
  {stimulus: 'fisherman-task/stimuli/fish10.png', fish_dominant: 1},
];


/*刺激の事前ロード*/
var preload = {
    type: jsPsychPreload,
    images: stimuli.map(s => s.stimulus) ,
    message: '画像を読み込んでいます...', 
    show_detailed_errors: true
}


/*fisherman課題*/
/*ラベルの湖A，Bの向きを，提示される画像と統一しました。*/
var fisherman = {
  timeline: [{
    type: jsPsychImageSliderResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    labels: ['0%', '100%'],
    prompt: `<p>釣り人が湖Aで釣りをしている確率はどのくらいですか？</p>
             <p>選択した確率(%): <span id='slider-value'>50</span></p>`,
    slider_width: 600,
    stimulus_width: 600,
    min: 0,
    max: 100,
    start: 50,
    button_label: "次へ",
    render_on_canvas: true,
    on_load: function() {
      let slider = document.querySelector('input[type="range"]');
      let output = document.getElementById('slider-value');
      slider.oninput = function() {
        output.textContent = this.value;
      };
    },
    data: function() {
      return {
        stimulus: jsPsych.timelineVariable('stimulus'),
        fish_dominant: jsPsych.timelineVariable('fish_dominant')
      };
    }
  }],
  timeline_variables: stimuli,
};


var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p><span style='font-size:20pt;'>研究に参加いただき，ありがとうございます!!!</span></p>"+
  "<p>キーボードのキーをどれか押して，開始してください</p>"
};

const debrief = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>キーボードのキーをどれか押すと結果がCSV形式でダウンロードされます。ブラウザを閉じて終了してください。ご参加ありがとうございました。</p>`,
};

/*タイムラインの設定*/
const timeline = [preload, welcome, fullscreen, instruction, fisherman, debrief];
