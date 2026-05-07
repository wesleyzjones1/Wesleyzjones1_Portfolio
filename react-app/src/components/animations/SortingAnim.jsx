export default function SortingAnim() {
  return (
    <>
      <style>{`
        .nav-anim-sort {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          padding-bottom: 1px;
        }
        .nav-anim-sort span {
          width: 4px;
          background: currentColor;
          border-radius: 1px 1px 0 0;
        }
        @keyframes sort-b1 { 0%, 100% { height: 16px; } 50% { height: 7px;  } }
        @keyframes sort-b2 { 0%, 100% { height: 9px;  } 50% { height: 20px; } }
        @keyframes sort-b3 { 0%, 100% { height: 20px; } 50% { height: 5px;  } }
        @keyframes sort-b4 { 0%, 100% { height: 5px;  } 50% { height: 13px; } }
        .nav-anim-sort span:nth-child(1) { animation: sort-b1 2s ease-in-out infinite 0s;    height: 16px; }
        .nav-anim-sort span:nth-child(2) { animation: sort-b2 2s ease-in-out infinite 0.25s; height: 9px;  }
        .nav-anim-sort span:nth-child(3) { animation: sort-b3 2s ease-in-out infinite 0.5s;  height: 20px; }
        .nav-anim-sort span:nth-child(4) { animation: sort-b4 2s ease-in-out infinite 0.75s; height: 5px;  }
      `}</style>
      <span className="nav-anim nav-anim-sort" aria-hidden="true">
        <span /><span /><span /><span />
      </span>
    </>
  )
}
