
const $ = (id)=>document.getElementById(id);
function show(id, html){ const el=$(id); if(el) el.innerHTML=html; }
function n(id){ return parseFloat($(id)?.value); }
function calculateAge(){
 const dob=$('dob').value; if(!dob) return show('result','Please select your date of birth.');
 const b=new Date(dob), t=new Date(); let y=t.getFullYear()-b.getFullYear(), m=t.getMonth()-b.getMonth(), d=t.getDate()-b.getDate();
 if(d<0){m--; d+=new Date(t.getFullYear(),t.getMonth(),0).getDate()} if(m<0){y--;m+=12}
 const days=Math.floor((t-b)/(1000*60*60*24));
 show('result',`You are <b>${y}</b> years, <b>${m}</b> months and <b>${d}</b> days old.<br>Total days lived: <b>${days.toLocaleString()}</b>`);
}
function calculateSleep(){
 const time=$('wake').value; if(!time) return show('result','Please choose wake-up time.');
 const [h,m]=time.split(':').map(Number); const wake=new Date(); wake.setHours(h,m,0,0);
 let out=[]; [6,5,4,3].forEach(c=>{let bed=new Date(wake.getTime()-c*90*60000-15*60000); out.push(`${c} cycles: <b>${bed.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</b>`)});
 show('result','Recommended bedtimes:<br>'+out.join('<br>'));
}
function calculateBMI(){
 const w=n('weight'), h=n('height')/100; if(!w||!h) return show('result','Please enter weight and height.');
 const bmi=w/(h*h); let s=bmi<18.5?'Underweight':bmi<25?'Normal weight':bmi<30?'Overweight':'Obese';
 show('result',`Your BMI is <b>${bmi.toFixed(1)}</b> — ${s}.`);
}
function calculateBMR(){
 const w=n('weight'), h=n('height'), age=n('age'), gender=$('gender').value; if(!w||!h||!age) return show('result','Please enter all values.');
 let bmr=10*w+6.25*h-5*age+(gender==='male'?5:-161);
 show('result',`Your estimated BMR is <b>${Math.round(bmr)}</b> calories/day.`);
}
function calculateCalorie(){
 const w=n('weight'), h=n('height'), age=n('age'), gender=$('gender').value, act=parseFloat($('activity').value); if(!w||!h||!age) return show('result','Please enter all values.');
 let bmr=10*w+6.25*h-5*age+(gender==='male'?5:-161), cal=bmr*act;
 show('result',`Maintenance calories: <b>${Math.round(cal)}</b>/day.<br>Weight loss target: <b>${Math.round(cal-500)}</b>/day.`);
}
function percentageCalc(){
 const part=n('part'), total=n('total'); if(isNaN(part)||isNaN(total)||total===0) return show('result','Please enter valid numbers.');
 show('result',`<b>${part}</b> is <b>${(part/total*100).toFixed(2)}%</b> of ${total}.`);
}
function gpaCalc(){
 let grades=document.querySelectorAll('.grade'), credits=document.querySelectorAll('.credit'), points=0, csum=0;
 grades.forEach((g,i)=>{let gr=parseFloat(g.value), cr=parseFloat(credits[i].value); if(!isNaN(gr)&&!isNaN(cr)){points+=gr*cr;csum+=cr}});
 if(!csum) return show('result','Enter at least one grade and credit.');
 show('result',`Your GPA is <b>${(points/csum).toFixed(2)}</b>.`);
}
function cgpaCalc(){
 const current=n('current'), completed=n('completed'), sem=n('sem'), semCredits=n('semCredits');
 if([current,completed,sem,semCredits].some(x=>isNaN(x))) return show('result','Please enter all values.');
 const cgpa=(current*completed+sem*semCredits)/(completed+semCredits);
 show('result',`Your new CGPA is <b>${cgpa.toFixed(2)}</b>.`);
}
function loanCalc(){
 const p=n('amount'), rate=n('rate')/100/12, months=n('months'); if(!p||isNaN(rate)||!months) return show('result','Please enter all values.');
 const pay= rate===0 ? p/months : p*rate*Math.pow(1+rate,months)/(Math.pow(1+rate,months)-1);
 show('result',`Monthly payment: <b>${pay.toFixed(2)}</b><br>Total payment: <b>${(pay*months).toFixed(2)}</b><br>Total interest: <b>${(pay*months-p).toFixed(2)}</b>`);
}
const emiCalc=loanCalc;
function unitConvert(){
 const v=n('value'), type=$('type').value; if(isNaN(v)) return show('result','Enter value.');
 const map={'kg-lb':[v*2.20462,'lb'],'lb-kg':[v/2.20462,'kg'],'km-mi':[v*.621371,'miles'],'mi-km':[v/.621371,'km'],'cm-in':[v*.393701,'inches'],'in-cm':[v/.393701,'cm'],'c-f':[v*9/5+32,'°F'],'f-c':[(v-32)*5/9,'°C']};
 let r=map[type]; show('result',`Result: <b>${r[0].toFixed(2)} ${r[1]}</b>`);
}
function wordCounter(){
 const text=$('text').value.trim(), words=text?text.split(/\s+/).length:0, chars=text.length, noSpace=text.replace(/\s/g,'').length;
 show('result',`Words: <b>${words}</b><br>Characters: <b>${chars}</b><br>Characters without spaces: <b>${noSpace}</b>`);
}
function characterCounter(){ wordCounter(); }
function caseConverter(mode){
 let text=$('text').value; if(mode==='upper') text=text.toUpperCase(); if(mode==='lower') text=text.toLowerCase();
 if(mode==='title') text=text.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
 $('text').value=text; show('result','Text converted successfully.');
}
function timeCalc(){
 const start=$('start').value, end=$('end').value; if(!start||!end) return show('result','Enter both times.');
 let [sh,sm]=start.split(':').map(Number), [eh,em]=end.split(':').map(Number);
 let s=sh*60+sm,e=eh*60+em;if(e<s)e+=1440; let diff=e-s;
 show('result',`Difference: <b>${Math.floor(diff/60)} hours ${diff%60} minutes</b>`);
}
function dateCalc(){
 const start=$('start').value, end=$('end').value; if(!start||!end) return show('result','Choose both dates.');
 let d=Math.abs((new Date(end)-new Date(start))/(1000*60*60*24));
 show('result',`Difference: <b>${Math.round(d)}</b> days.`);
}
function discountCalc(){
 const price=n('price'), dis=n('discount'); if(isNaN(price)||isNaN(dis)) return show('result','Enter valid values.');
 const save=price*dis/100, final=price-save; show('result',`You save: <b>${save.toFixed(2)}</b><br>Final price: <b>${final.toFixed(2)}</b>`);
}
function marginCalc(){
 const cost=n('cost'), sell=n('sell'); if(isNaN(cost)||isNaN(sell)||sell===0) return show('result','Enter valid values.');
 const profit=sell-cost, margin=profit/sell*100, markup=profit/cost*100;
 show('result',`Profit: <b>${profit.toFixed(2)}</b><br>Margin: <b>${margin.toFixed(2)}%</b><br>Markup: <b>${markup.toFixed(2)}%</b>`);
}
function tipCalc(){
 const bill=n('bill'), tip=n('tip'), people=n('people')||1; if(isNaN(bill)||isNaN(tip)) return show('result','Enter valid values.');
 const tipAmt=bill*tip/100, total=bill+tipAmt; show('result',`Tip: <b>${tipAmt.toFixed(2)}</b><br>Total: <b>${total.toFixed(2)}</b><br>Per person: <b>${(total/people).toFixed(2)}</b>`);
}
function currencyCalc(){
 const amount=n('amount'), rate=n('rate'); if(isNaN(amount)||isNaN(rate)) return show('result','Enter amount and exchange rate.');
 show('result',`Converted amount: <b>${(amount*rate).toFixed(2)}</b><br><small>Manual rate converter. For live rates, add an API later.</small>`);
}
function searchTools(){
 const q=($('toolSearch')?.value||'').toLowerCase();
 document.querySelectorAll('[data-tool]').forEach(card=>{card.style.display=card.dataset.tool.toLowerCase().includes(q)?'block':'none'});
}
document.querySelectorAll('.cat').forEach(btn => {
    btn.addEventListener('click', function () {

        document.querySelectorAll('.cat').forEach(item => {
            item.classList.remove('active');
        });

        this.classList.add('active');const heading=document.getElementById('toolsHeading');

if(this.textContent.includes('Health')){
    heading.textContent='❤️ Health Calculators';
}
else if(this.textContent.includes('Finance')){
    heading.textContent='💰 Finance Calculators';
}
else if(this.textContent.includes('Education')){
    heading.textContent='🎓 Education Tools';
}
else if(this.textContent.includes('Text')){
    heading.textContent='📝 Text Tools';
}
else if(this.textContent.includes('Conversion')){
    heading.textContent='🔄 Conversion Tools';
}
else{
    heading.textContent='📋 All Tools';
}

    });
});