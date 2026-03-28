import { useState, useEffect } from "react";

const days = [
  { n:"01", date:"Qui · 28 Mai", title:"✈️ Embarque — Brasil → Europa", stops:[
    {icon:"🛫", name:"Voo · 17:55 — Fortaleza → Madrid", desc:"Chegada Madrid 06:40 do dia 29/05. Chegue ao aeroporto às 14:55 (3h antes).", tag:"Conexão MAD"},
    {icon:"💼", name:"Bagagem de mão essencial", desc:"Passaporte, cartão embarque, medicações, eletrônicos, muda de roupa, power bank."},
  ], alert:"⏰ Chegue ao aeroporto às 14:55 — 3h antes do voo."},
  { n:"02", date:"Sex · 29 Mai", title:"🔄 Conexão Madrid + Chegada Berlim", stops:[
    {icon:"🛬", name:"Chegada Madrid · 06:40 — Sala VIP", desc:"Conexão ~8h. Alimentação, Wi-Fi e descanso na Sala VIP."},
    {icon:"🛫", name:"Madrid → Berlim · 16:00", desc:"Chegada em Berlim às 19:00."},
    {icon:"🏨", name:"Check-in · a&o Berlin Kolumbus", desc:"Genslerstraße 18, 13055 Berlin. Caminhada livre nos arredores."},
  ]},
  { n:"3·4", date:"Sáb e Dom · 30–31 Mai", title:"🗺️ City Tour Berlim — 2 dias a pé", stops:[
    {icon:"🕍", name:"Bairro Judeu + Nova Sinagoga + Hackescher Markt", desc:"Coração da comunidade judaica de Berlim."},
    {icon:"🧱", name:"Memorial do Muro + Portão de Brandemburgo", desc:"Símbolo da reunificação alemã."},
    {icon:"🏛️", name:"Unter den Linden · Bebelplatz · Nova Guarda", desc:"A famosa avenida e pontos históricos."},
    {icon:"🎨", name:"Ilha dos Museus + Gendarmenmarkt", desc:"Joia cultural de Berlim."},
    {icon:"🎭", name:"Checkpoint Charlie · KuDamm · Igreja da Memória", desc:"Passagem histórica Berlim Oriental/Ocidental."},
    {icon:"🕯️", name:"Sony Center · Memorial aos Judeus · Bunker de Hitler", desc:"História turbulenta e moderna."},
    {icon:"🏛️", name:"Reichstag + Tiergarten", desc:"Sede do governo e parque central."},
  ], alert:"🕘 Saída 09:00 · Guia brasileiro · Tour 4h/dia · Café no hotel ~€12"},
  { n:"05", date:"Seg · 1 Jun", title:"🚂 Berlim → Cracóvia (7h de trem)", stops:[
    {icon:"🏨", name:"Checkout · 10:30 — Táxi até Berlin Hbf ~30 min", desc:""},
    {icon:"🚂", name:"Trem DB EC 57 · Saída 12:52", desc:"Berlin Hbf → Kraków Główny. Chegada 20:02. Wi-Fi e USB a bordo.", tag:"~7h10"},
    {icon:"🏨", name:"Check-in · Happy Tower Kraków", desc:"ul. Józefa Dietla 97, Kraków. Noite livre."},
  ], alertDanger:"⚠️ Leve lanche — sem paradas em 7h. Refeições a bordo são caras."},
  { n:"06", date:"Ter · 2 Jun", title:"🏰 Centro Histórico de Cracóvia", stops:[
    {icon:"🏰", name:"Castelo de Wawel", desc:"Tram 8, 10 ou 18 (parada Wawel, ~15 min). Alternativa: 25 min a pé do hotel."},
    {icon:"⛪", name:"Igreja de São Pedro e São Paulo", desc:"10 min a pé do castelo."},
    {icon:"🍽", name:"Almoço · Praça do Mercado (Rynek Główny)", desc:"Culinária polonesa e internacional."},
    {icon:"🛍", name:"Cloth Hall + St. Florian's Gate", desc:"Souvenires, âmbar. Portão histórico a 5 min da praça."},
    {icon:"🍷", name:"Jantar — Centro Antigo", desc:"Retorno ao hotel: trams 4, 8 ou 24."},
  ], alert:"🕘 Saída 09:00 · Roteiro quase todo a pé"},
  { n:"07", date:"Qua · 3 Jun", title:"🕯️ Auschwitz + Bairro Judeu Kazimierz", stops:[
    {icon:"🕯️", name:"Auschwitz-Birkenau (manhã)", desc:"Transporte incluído, guia em espanhol. Meio período."},
    {icon:"🕍", name:"Bairro Judeu de Kazimierz", desc:"Tram 3, 6, 8 ou 24 até Plac Wolnica (~15 min). Cafés, bares, ruas históricas."},
    {icon:"🏭", name:"Fábrica de Schindler (opcional)", desc:"Tram 3, 6 ou 24 até Pl. Bohaterów Getta + 5 min."},
  ], alertDanger:"⚠️ Voo às 06:30 amanhã! Organize a bagagem esta noite. Horário de traslado será informado pelos líderes."},
  { n:"08", date:"Qui · 4 Jun", title:"🚢 Chegada Gênova — Caruggi & Pôr do Sol", stops:[
    {icon:"🛫", name:"Wizz Air · KRK 06:30 → GNV 08:30", desc:"Táxi ao Hotel Nologo: 20–25 min (guarda de bagagem)."},
    {icon:"📸", name:"Piazza De Ferrari + Via XX Settembre", desc:"Foto oficial do grupo na fonte icônica."},
    {icon:"⛪", name:"Catedral de San Lorenzo", desc:"Fachada listrada mais famosa da cidade."},
    {icon:"🍝", name:"Almoço — Pesto Genovese legítimo", desc:"Em uma osteria local."},
    {icon:"⚓", name:"Porto Antico", desc:"Aquário de Gênova e o Bigo."},
    {icon:"🌅", name:"Spianata Castelletto — Pôr do Sol 360°", desc:"Elevador histórico. Descida a pé pelas ruelas fotogênicas."},
  ]},
  { n:"09", date:"Sex · 5 Jun", title:"🧭 Colombo, Palácios & Boccadasse", stops:[
    {icon:"🧭", name:"Casa de Colombo & Porta Soprana", desc:"Casa do navegador e torres medievais."},
    {icon:"🏛️", name:"Via Garibaldi — Palazzi dei Rolli (UNESCO)", desc:"Terraço do Palazzo Rosso com vista panorâmica."},
    {icon:"🍞", name:"Focaccia Genovese", desc:"Parada estratégica em padaria local."},
    {icon:"🏖️", name:"Boccadasse — Vila de Pescadores", desc:"Casas coloridas, Dolce Vita. Gelato na Antica Gelateria Amedeo."},
    {icon:"🍷", name:"Jantar de Despedida — Boccadasse", desc:"Última noite em Gênova. Tudo arrumado para o trem."},
  ], alert:"🕘 Saída 09:00", alertDanger:"⚠️ Trem para Roma cedo amanhã! Tudo arrumado esta noite."},
  { n:"10", date:"Sáb · 6 Jun", title:"🏛️ Chegada Roma — Vaticano & Clássicos", stops:[
    {icon:"🚂", name:"Trem Gênova → Roma · 08:53", desc:"Genoa Piazza Principe → Roma Termini 14:33.", tag:"~5h40"},
    {icon:"⛪", name:"Visita Guiada ao Vaticano (~2h)", desc:"Após o Angelus. ⚠️ Ombros e joelhos cobertos para entrar na Basílica."},
    {icon:"💦", name:"Fontana di Trevi → Panteão → Piazza Navona", desc:"10 min da Trevi ao Panteão. 5 min ao Panteão à Navona."},
  ]},
  { n:"11", date:"Dom · 7 Jun", title:"✝️ Angelus Papal + Coliseu + Castel Sant'Angelo", stops:[
    {icon:"✝️", name:"Angelus · 12:00 — Praça São Pedro", desc:"Papa na janela do Palácio Apostólico. ~10 min a pé do hotel."},
    {icon:"🏟️", name:"Coliseu (externo) — opcional entrada", desc:"Linha B até Colosseo."},
    {icon:"🏛️", name:"Fórum Romano + Monte Palatino", desc:"Caminhada pela área arqueológica."},
    {icon:"🏰", name:"Castel Sant'Angelo + Ponte Sant'Angelo", desc:"15 min a pé do Vaticano."},
  ], alert:"🕗 Saída 08:00 — chegue cedo à Praça São Pedro"},
  { n:"12", date:"Seg · 8 Jun", title:"🌿 Dia Livre em Roma ou Bate-volta", stops:[
    {icon:"🚗", name:"Bate-volta", desc:"Tivoli (2h) · Ostia Antica (1h) · Castel Gandolfo (1h) · Assis (2,5h) · Florença (1h)"},
    {icon:"🛤", name:"Ficar em Roma", desc:"Trastevere · Campo de' Fiori · Comprinhas"},
    {icon:"🍽", name:"Último jantar em Roma", desc:"Mala pronta, documentos separados, alarme programado."},
  ], alert:"🕗 Saída 08:00 · Prepare-se para retorno de madrugada"},
  { n:"13", date:"Ter · 9 Jun", title:"🏠 Retorno ao Brasil", stops:[
    {icon:"🛫", name:"Roma → Madrid · 06:20 → 08:55", desc:""},
    {icon:"🛫", name:"Madrid → Fortaleza · 12:35 → 16:25", desc:"Chegada em Fortaleza às 16:25! 🎉"},
  ]},
];

const hotels = [
  {flag:"🇩🇪", city:"Berlim · 29 Mai – 1 Jun", name:"a&o Berlin Kolumbus", addr:"Genslerstraße 18, 13055 Berlin, Alemanha"},
  {flag:"🇵🇱", city:"Cracóvia · 1–4 Jun", name:"Happy Tower Kraków", addr:"ul. Józefa Dietla 97, 31-031 Kraków, Polônia"},
  {flag:"🇮🇹", city:"Gênova · 4–6 Jun", name:"Hotel Nologo", addr:"Viale Sauli, 5, 16121 Genova GE, Itália"},
  {flag:"🇻🇦", city:"Roma · 6–9 Jun", name:"Vaticanspace Rooms", addr:"Via Cardinal Agliardi, Roma, Itália"},
];

const contacts = [
  {name:"Andrei", role:"Líder", phone:"+55 85 99603-2059"},
  {name:"Carol", role:"Líder", phone:"+55 85 99274-1347"},
  {name:"Pedro", role:"Líder", phone:"+55 85 99905-3460"},
];

const faqs = [
  {q:"Me perdi do grupo. E agora?", a:"Calma! Pare em local seguro (loja, café). Abra o WhatsApp do grupo ou contate um líder direto. Envie sua localização. Sem internet? Procure Wi-Fi público. Não conseguiu? Fique no local onde se perdeu — um líder irá até você. Nunca saia sem direção."},
  {q:"Não quero fazer um passeio. Posso ficar?", a:"Sem problema! Avise um líder com antecedência. Fique livre para descansar ou explorar por conta. O líder combinará um ponto de reencontro. Ninguém é obrigado a participar de tudo."},
  {q:"Posso fazer algo diferente do grupo?", a:"Sim! Avise a liderança com antecedência. Combine horário e local de retorno. Mantenha celular carregado e com internet. A única regra é comunicação."},
  {q:"E se eu passar mal ou precisar de ajuda urgente?", a:"Avise imediatamente um líder. Iremos juntos a farmácia, hospital ou posto médico. Tenha sempre documentos e seguro-viagem à mão. Emergência na Europa: 112."},
  {q:"Vai existir mais de um grupo nos passeios?", a:"Sim. Podem surgir subgrupos conforme ritmo e interesse. Todos os grupos sempre terão pelo menos um líder responsável."},
  {q:"Estou cansado. Posso descansar?", a:"Claro! Viagem também é descanso. Avise a liderança. Pode retornar ao hotel ou diminuir o ritmo. O importante é respeitar seus limites."},
  {q:"Não falo outro idioma. Vou ter problema?", a:"Fique tranquilo. Os líderes ajudam com tudo. Em pontos turísticos e hotéis, inglês básico é suficiente — e estaremos juntos na maior parte do tempo."},
  {q:"Qual é a regra mais importante?", a:"Comunique-se. Tudo funciona quando avisamos, combinamos e respeitamos os horários. Simples assim. 😊"},
];

function Clock() {
  const [times, setTimes] = useState({brTime:"--:--:--",brDate:"",euTime:"--:--:--",euDate:""});
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const br = new Date(utc + (-3 * 3600000));
      const eu = new Date(utc + (2 * 3600000));
      const ft = d => d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
      const fd = d => d.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'2-digit'});
      setTimes({brTime:ft(br),brDate:fd(br),euTime:ft(eu),euDate:fd(eu)});
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{background:"#1A1108",padding:"0.65rem 1rem",display:"flex",gap:"1.2rem",justifyContent:"center",flexWrap:"wrap",borderBottom:"1px solid rgba(212,98,10,0.3)",position:"sticky",top:0,zIndex:100}}>
      {[{flag:"🇧🇷",label:"Fortaleza",time:times.brTime,date:times.brDate},{flag:"🇪🇺",label:"Europa CEST",time:times.euTime,date:times.euDate}].map(c=>(
        <div key={c.label} style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
          <span style={{fontSize:"1.1rem"}}>{c.flag}</span>
          <div>
            <div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5A44A"}}>{c.label}</div>
            <div style={{fontFamily:"monospace",fontSize:"1rem",fontWeight:600,color:"#FDF6EC"}}>{c.time}</div>
            <div style={{fontFamily:"monospace",fontSize:"0.6rem",color:"rgba(253,246,236,0.4)"}}>{c.date}</div>
          </div>
        </div>
      ))}
      <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
        <span style={{fontSize:"1.1rem"}}>⏱</span>
        <div>
          <div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5A44A"}}>Diferença</div>
          <div style={{fontFamily:"monospace",fontSize:"0.9rem",fontWeight:600,color:"#FDF6EC"}}>Europa +5h</div>
        </div>
      </div>
    </div>
  );
}

function DayCard({day}) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={()=>setOpen(!open)} style={{background:"white",borderRadius:14,marginBottom:"0.9rem",border:"1px solid rgba(212,98,10,0.12)",overflow:"hidden",boxShadow:"0 2px 14px rgba(26,17,8,0.05)",cursor:"pointer"}}>
      <div style={{background:"linear-gradient(135deg,#D4620A,#B8520A)",padding:"0.9rem 1.1rem",display:"flex",alignItems:"center",gap:"0.8rem"}}>
        <div style={{fontFamily:"Georgia,serif",fontSize:"1.7rem",fontWeight:900,color:"rgba(253,246,236,0.22)",lineHeight:1,minWidth:"2.2rem"}}>{day.n}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(253,246,236,0.6)",marginBottom:"0.12rem"}}>{day.date}</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"0.95rem",fontWeight:700,color:"white",lineHeight:1.2}}>{day.title}</div>
        </div>
        <div style={{color:"rgba(253,246,236,0.6)",fontSize:"0.9rem",transform:open?"rotate(180deg)":"none",transition:"0.3s"}}>{open?"▲":"▼"}</div>
      </div>
      {open && (
        <div style={{padding:"1.1rem"}}>
          {day.alert && <div style={{background:"#FFF3E0",borderLeft:"4px solid #D4620A",borderRadius:7,padding:"0.7rem 0.9rem",marginBottom:"0.7rem",fontSize:"0.8rem",color:"#5C3A1E",lineHeight:1.5}} dangerouslySetInnerHTML={{__html:day.alert}} />}
          {day.alertDanger && <div style={{background:"#FDECEA",borderLeft:"4px solid #C0392B",borderRadius:7,padding:"0.7rem 0.9rem",marginBottom:"0.7rem",fontSize:"0.8rem",color:"#5C3A1E",lineHeight:1.5}} dangerouslySetInnerHTML={{__html:day.alertDanger}} />}
          {day.stops.map((s,i)=>(
            <div key={i} style={{display:"flex",gap:"0.7rem",marginBottom:"0.9rem",paddingBottom:"0.9rem",borderBottom:i<day.stops.length-1?"1px dashed rgba(212,98,10,0.12)":"none"}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:"#F7E8D0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",flexShrink:0}}>{s.icon}</div>
              <div>
                <div style={{fontWeight:700,fontSize:"0.83rem",color:"#D4620A",marginBottom:"0.12rem"}}>{s.name}</div>
                {s.desc && <div style={{fontSize:"0.76rem",color:"#5C3A1E",lineHeight:1.5}}>{s.desc}</div>}
                {s.tag && <span style={{display:"inline-block",background:"#F7E8D0",border:"1px solid rgba(212,98,10,0.2)",color:"#D4620A",fontSize:"0.58rem",fontFamily:"monospace",letterSpacing:"0.08em",textTransform:"uppercase",padding:"0.12rem 0.5rem",borderRadius:100,marginTop:"0.3rem"}}>{s.tag}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CityBadge({flag,name,dates,pills}) {
  return (
    <div style={{background:"linear-gradient(135deg,#1A1108,#5C3A1E)",borderRadius:12,padding:"1rem 1.2rem",marginBottom:"0.7rem",display:"flex",alignItems:"center",gap:"0.8rem"}}>
      <span style={{fontSize:"2rem"}}>{flag}</span>
      <div>
        <div style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",fontWeight:900,color:"white"}}>{name}</div>
        <div style={{fontFamily:"monospace",fontSize:"0.6rem",color:"rgba(253,246,236,0.5)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"0.35rem"}}>{dates}</div>
        <div>{pills.map((p,i)=><span key={i} style={{display:"inline-block",background:"rgba(212,98,10,0.18)",border:"1px solid rgba(212,98,10,0.3)",color:"#F5A44A",fontSize:"0.58rem",fontFamily:"monospace",letterSpacing:"0.08em",textTransform:"uppercase",padding:"0.18rem 0.55rem",borderRadius:100,margin:"0.1rem"}}>{p}</span>)}</div>
      </div>
    </div>
  );
}

function FaqItem({q,a}) {
  const [open,setOpen] = useState(false);
  return (
    <div style={{background:"white",borderRadius:10,marginBottom:"0.6rem",border:"1px solid rgba(212,98,10,0.1)",overflow:"hidden"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"0.9rem 1.1rem",fontWeight:600,fontSize:"0.85rem",color:open?"#D4620A":"#1A1108",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"0.5rem",userSelect:"none"}}>
        {q}<span style={{color:"#D4620A",fontSize:"0.9rem",transform:open?"rotate(180deg)":"none",transition:"0.3s",flexShrink:0}}>▼</span>
      </div>
      {open && <div style={{padding:"0 1.1rem 0.9rem",fontSize:"0.8rem",color:"#5C3A1E",lineHeight:1.6,borderTop:"1px solid rgba(212,98,10,0.08)",paddingTop:"0.7rem"}}>{a}</div>}
    </div>
  );
}

function Check({icon,children}) {
  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:"0.6rem",padding:"0.55rem 0",borderBottom:"1px dashed rgba(212,98,10,0.1)",fontSize:"0.82rem",color:"#5C3A1E",lineHeight:1.4}}>
      <div style={{width:17,height:17,borderRadius:"50%",background:"rgba(45,106,79,0.1)",color:"#2D6A4F",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.6rem",flexShrink:0,marginTop:2}}>{icon||"✓"}</div>
      <span>{children}</span>
    </div>
  );
}

const tabs = ["roteiro","info","hoteis","contatos","bagagem","faq"];
const tabLabels = ["📅 Roteiro","ℹ️ Geral","🏨 Hotéis","📞 Contatos","🧳 Bagagem","❓ Dúvidas"];

export default function App() {
  const [tab, setTab] = useState("roteiro");
  const amber = "#D4620A", cream = "#FDF6EC", warm = "#F7E8D0";

  return (
    <div style={{background:cream,minHeight:"100vh",fontFamily:"'Segoe UI',sans-serif",maxWidth:"100%",overflowX:"hidden"}}>
      {/* HERO */}
      <div style={{background:"linear-gradient(160deg,#1A0A02,#3D1F00,#6B3500)",padding:"2.5rem 1.5rem 2rem",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
        <div style={{fontFamily:"monospace",fontSize:"0.62rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#F5A44A",background:"rgba(212,98,10,0.18)",border:"1px solid rgba(212,98,10,0.4)",padding:"0.3rem 1rem",borderRadius:100,marginBottom:"1rem"}}>@viajartodocanto · Todo Canto</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:"clamp(2.4rem,8vw,5rem)",fontWeight:900,color:cream,lineHeight:1}}>Guia de</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:"clamp(2.4rem,8vw,5rem)",fontWeight:900,color:"#F5A44A",lineHeight:1,fontStyle:"italic"}}>Bordo</div>
        <div style={{color:"rgba(253,246,236,0.5)",fontSize:"0.82rem",marginTop:"0.7rem",fontWeight:300,letterSpacing:"0.04em"}}>Turma Europa 2026 · Berlim · Cracóvia · Gênova · Roma</div>
      </div>

      <Clock />

      {/* NAV */}
      <div style={{background:warm,borderBottom:`2px solid ${amber}`,display:"flex",gap:0,overflowX:"auto",scrollbarWidth:"none"}}>
        {tabs.map((t,i)=>(
          <button key={t} onClick={()=>setTab(t)} style={{background:"none",border:"none",padding:"0.8rem 0.9rem",fontFamily:"inherit",fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.04em",textTransform:"uppercase",color:tab===t?amber:"#5C3A1E",cursor:"pointer",whiteSpace:"nowrap",borderBottom:`3px solid ${tab===t?amber:"transparent"}`,position:"relative",top:2,transition:"all 0.2s"}}>{tabLabels[i]}</button>
        ))}
      </div>

      <div style={{maxWidth:720,margin:"0 auto",padding:"1.4rem 1rem"}}>

        {/* ROTEIRO */}
        {tab==="roteiro" && <>
          <div style={{display:"flex",alignItems:"flex-end",gap:"0.7rem",marginBottom:"1.3rem",paddingBottom:"0.7rem",borderBottom:"1px solid rgba(212,98,10,0.18)"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"3.2rem",fontWeight:900,color:"rgba(212,98,10,0.1)",lineHeight:1}}>03</span>
            <div><div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:amber,marginBottom:"0.2rem"}}>Dia a Dia</div><div style={{fontFamily:"Georgia,serif",fontSize:"1.5rem",fontWeight:700}}>Roteiro Completo</div></div>
          </div>
          {days.slice(0,2).map((d,i)=><DayCard key={i} day={d}/>)}
          <CityBadge flag="🇩🇪" name="Berlim" dates="30 Mai – 1 Jun" pills={["🌡 12–22°C","💶 Euro €","⏰ +5h Brasília"]}/>
          {days.slice(2,4).map((d,i)=><DayCard key={i} day={d}/>)}
          <CityBadge flag="🇵🇱" name="Cracóvia" dates="2–3 Jun · Polônia" pills={["🌡 15–22°C","💴 Złoty PLN","⏰ +5h Brasília"]}/>
          {days.slice(4,6).map((d,i)=><DayCard key={i} day={d}/>)}
          <CityBadge flag="🇮🇹" name="Itália" dates="4–9 Jun · Gênova + Roma" pills={["🌡 18–25°C","💶 Euro €","⚠️ Cuidado bolsistas"]}/>
          {days.slice(6).map((d,i)=><DayCard key={i} day={d}/>)}
        </>}

        {/* INFO */}
        {tab==="info" && <>
          <div style={{display:"flex",alignItems:"flex-end",gap:"0.7rem",marginBottom:"1.3rem",paddingBottom:"0.7rem",borderBottom:"1px solid rgba(212,98,10,0.18)"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"3.2rem",fontWeight:900,color:"rgba(212,98,10,0.1)",lineHeight:1}}>02</span>
            <div><div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:amber,marginBottom:"0.2rem"}}>Essencial</div><div style={{fontFamily:"Georgia,serif",fontSize:"1.5rem",fontWeight:700}}>Informações Gerais</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"0.6rem",marginBottom:"0.8rem"}}>
            {[["📄 Documentos","Passaporte válido (mín. 6 meses) + seguro obrigatório"],["💶 Moeda","Euro (€) — DE e IT / Złoty (PLN) — PL"],["🌡 Clima","Primavera 10–25°C. Leve casaco!"],["🔌 Tomadas","Padrão europeu Tipo C/F"],["💳 Dinheiro","Cartão funciona bem. Wise recomendado."],["⏰ Fuso","Europa = Brasília +5h (CEST)"]].map(([l,v])=>(
              <div key={l} style={{background:warm,borderRadius:8,padding:"0.75rem",borderLeft:`3px solid ${amber}`}}>
                <div style={{fontFamily:"monospace",fontSize:"0.57rem",letterSpacing:"0.16em",textTransform:"uppercase",color:"#9C6B3A",marginBottom:"0.22rem"}}>{l}</div>
                <div style={{fontSize:"0.8rem",fontWeight:600}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#FFF3E0",borderLeft:`4px solid ${amber}`,borderRadius:7,padding:"0.75rem 0.9rem",marginBottom:"0.8rem",fontSize:"0.8rem",color:"#5C3A1E",lineHeight:1.5}}>💡 O <strong>Wise</strong> é item fundamental — converte euros e Złoty sem taxas abusivas.</div>
          <div style={{background:"#FDECEA",borderLeft:"4px solid #C0392B",borderRadius:7,padding:"0.75rem 0.9rem",marginBottom:"0.9rem",fontSize:"0.8rem",color:"#5C3A1E",lineHeight:1.5}}>⚠️ <strong>Itália: batedores de carteira</strong> em locais turísticos. Pertences sempre à frente do corpo. Nunca deixe objetos em mesas de restaurante.</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"0.95rem",fontWeight:700,color:"#1A1108",margin:"1rem 0 0.55rem"}}>📋 Dicas — Antes de Dormir</div>
          <div style={{background:"white",borderRadius:10,padding:"0.9rem 1rem",border:"1px solid rgba(212,98,10,0.1)"}}>
            {["Separar documentos do dia seguinte (passaporte, ingressos)","Carregar celular, power bank, relógio e fones","Separar roupa do dia seguinte","Organizar mochila: água, documento, protetor solar","Conferir horários de passeios e trens","Separar dinheiro trocado","Ajustar alarmes (principal + reserva)"].map(t=><Check key={t}>{t}</Check>)}
          </div>
        </>}

        {/* HOTÉIS */}
        {tab==="hoteis" && <>
          <div style={{display:"flex",alignItems:"flex-end",gap:"0.7rem",marginBottom:"1.3rem",paddingBottom:"0.7rem",borderBottom:"1px solid rgba(212,98,10,0.18)"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"3.2rem",fontWeight:900,color:"rgba(212,98,10,0.1)",lineHeight:1}}>06</span>
            <div><div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:amber,marginBottom:"0.2rem"}}>Hospedagens</div><div style={{fontFamily:"Georgia,serif",fontSize:"1.5rem",fontWeight:700}}>Onde Ficaremos</div></div>
          </div>
          {hotels.map(h=>(
            <div key={h.name} style={{background:"white",borderRadius:10,padding:"1rem",marginBottom:"0.7rem",border:"1px solid rgba(212,98,10,0.1)",display:"flex",gap:"0.8rem",alignItems:"flex-start"}}>
              <span style={{fontSize:"1.8rem"}}>{h.flag}</span>
              <div>
                <div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.16em",textTransform:"uppercase",color:amber,marginBottom:"0.15rem"}}>{h.city}</div>
                <div style={{fontWeight:700,fontSize:"0.9rem",marginBottom:"0.18rem"}}>{h.name}</div>
                <div style={{fontSize:"0.75rem",color:"#9C6B3A",lineHeight:1.4}}>{h.addr}</div>
              </div>
            </div>
          ))}
          <div style={{background:"#FFF3E0",borderLeft:`4px solid ${amber}`,borderRadius:7,padding:"0.75rem 0.9rem",marginTop:"0.8rem",fontSize:"0.8rem",color:"#5C3A1E",lineHeight:1.5}}>🔑 Mantenha documentos, dinheiro e eletrônicos sempre na <strong>bagagem de mão</strong>.</div>
        </>}

        {/* CONTATOS */}
        {tab==="contatos" && <>
          <div style={{display:"flex",alignItems:"flex-end",gap:"0.7rem",marginBottom:"1.3rem",paddingBottom:"0.7rem",borderBottom:"1px solid rgba(212,98,10,0.18)"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"3.2rem",fontWeight:900,color:"rgba(212,98,10,0.1)",lineHeight:1}}>06</span>
            <div><div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:amber,marginBottom:"0.2rem"}}>Líderes & Emergência</div><div style={{fontFamily:"Georgia,serif",fontSize:"1.5rem",fontWeight:700}}>Contatos Úteis</div></div>
          </div>
          <div style={{background:"linear-gradient(135deg,#C0392B,#8B1A12)",borderRadius:14,padding:"1.3rem",color:"white",textAlign:"center",marginBottom:"1rem"}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:"3rem",fontWeight:900}}>112</div>
            <div style={{fontFamily:"monospace",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",opacity:0.75,marginTop:"0.2rem"}}>Emergência Europa — Polícia · Bombeiros · Ambulância</div>
          </div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"0.95rem",fontWeight:700,color:"#1A1108",margin:"0.9rem 0 0.5rem"}}>👥 Líderes da Viagem</div>
          {contacts.map(c=>{
            const wa = c.phone.replace(/\D/g,"");
            return (
              <a key={c.name} href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block"}}>
                <div style={{background:"white",borderRadius:10,padding:"0.9rem 1.1rem",marginBottom:"0.6rem",border:"1px solid rgba(212,98,10,0.1)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"0.8rem"}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:"0.87rem",color:"#1A1108"}}>{c.name}</div>
                    <div style={{fontFamily:"monospace",fontSize:"0.6rem",color:"#9C6B3A",letterSpacing:"0.08em",textTransform:"uppercase"}}>{c.role}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
                    <span style={{fontSize:"1.1rem"}}>💬</span>
                    <div style={{fontFamily:"monospace",fontSize:"0.82rem",color:"#25D366",fontWeight:700,whiteSpace:"nowrap"}}>{c.phone}</div>
                  </div>
                </div>
              </a>
            );
          })}
          <div style={{background:warm,borderRadius:10,padding:"0.9rem 1.1rem",marginBottom:"0.6rem",border:`2px dashed rgba(212,98,10,0.3)`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"0.8rem"}}>
            <div><div style={{fontWeight:700,fontSize:"0.87rem"}}>Seguro Viagem</div><div style={{fontFamily:"monospace",fontSize:"0.6rem",color:"#9C6B3A",letterSpacing:"0.08em",textTransform:"uppercase"}}>Anote aqui o número</div></div>
            <div style={{fontFamily:"monospace",fontSize:"0.82rem",color:"#9C6B3A"}}>— anotar —</div>
          </div>
          <div style={{background:"#FFF3E0",borderLeft:`4px solid ${amber}`,borderRadius:7,padding:"0.75rem 0.9rem",marginTop:"0.8rem",fontSize:"0.8rem",color:"#5C3A1E",lineHeight:1.5}}>🏥 Para hospitais ou atendimento médico, avise imediatamente um líder ou a recepção do hotel.</div>
        </>}

        {/* BAGAGEM */}
        {tab==="bagagem" && <>
          <div style={{display:"flex",alignItems:"flex-end",gap:"0.7rem",marginBottom:"1.3rem",paddingBottom:"0.7rem",borderBottom:"1px solid rgba(212,98,10,0.18)"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"3.2rem",fontWeight:900,color:"rgba(212,98,10,0.1)",lineHeight:1}}>05</span>
            <div><div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:amber,marginBottom:"0.2rem"}}>Packing</div><div style={{fontFamily:"Georgia,serif",fontSize:"1.5rem",fontWeight:700}}>Bagagem & Mala</div></div>
          </div>
          <div style={{background:"#FDECEA",borderLeft:"4px solid #C0392B",borderRadius:7,padding:"0.75rem 0.9rem",marginBottom:"0.8rem",fontSize:"0.8rem",color:"#5C3A1E",lineHeight:1.5}}>✈️ <strong>Viagem SEM bagagem despachada</strong> — tudo em 1 mala de mão (até 10kg) + 1 item pessoal.</div>
          {[["🧳 O Que Levar na Mala",["Roupas versáteis que combinem entre si","Casacos leves (camadas funcionam melhor)","1 pijama + roupa íntima para alguns dias","1 tênis confortável (já usado de preferência)","💡 Enrole as roupas — economiza espaço!"]],
            ["✈️ Sempre na Bagagem de Mão",["Passaporte + documentos pessoais","Cartões, dinheiro e Wise","Celular, carregador, fones","Power bank (PROIBIDO no despachado)","Adaptador europeu (Tipo C/F)","Medicamentos + foto da receita"]],
            ["💊 Remédios Recomendados",["Analgésico / antitérmico","Antialérgico","Remédio para enjoo","Remédio para dor no estômago / azia","Antidiarreico"]],
            ["💧 Regra dos Líquidos",["Máx. 100ml por frasco","Tudo em 1 ziplock transparente (máx. 1 litro)","1 ziplock por pessoa — leve pronto de casa!"]],
          ].map(([title,items])=>(
            <div key={title}>
              <div style={{fontFamily:"Georgia,serif",fontSize:"0.95rem",fontWeight:700,color:"#1A1108",margin:"0.9rem 0 0.5rem"}}>{title}</div>
              <div style={{background:"white",borderRadius:10,padding:"0.9rem 1rem",border:"1px solid rgba(212,98,10,0.1)"}}>
                {items.map(item=><Check key={item}>{item}</Check>)}
              </div>
            </div>
          ))}
        </>}

        {/* FAQ */}
        {tab==="faq" && <>
          <div style={{display:"flex",alignItems:"flex-end",gap:"0.7rem",marginBottom:"1.3rem",paddingBottom:"0.7rem",borderBottom:"1px solid rgba(212,98,10,0.18)"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"3.2rem",fontWeight:900,color:"rgba(212,98,10,0.1)",lineHeight:1}}>04</span>
            <div><div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:amber,marginBottom:"0.2rem"}}>Suporte</div><div style={{fontFamily:"Georgia,serif",fontSize:"1.5rem",fontWeight:700}}>Dúvidas Frequentes</div></div>
          </div>
          {faqs.map(f=><FaqItem key={f.q} q={f.q} a={f.a}/>)}
        </>}

      </div>

      <div style={{background:"#1A1108",color:"rgba(253,246,236,0.35)",textAlign:"center",padding:"1.1rem",fontSize:"0.68rem",fontFamily:"monospace",letterSpacing:"0.08em"}}>
        <span style={{color:"#D4620A"}}>Turma Europa 2026</span> · Todo Canto · @viajartodocanto · Bora nessa! 🌍
      </div>
    </div>
  );
}
