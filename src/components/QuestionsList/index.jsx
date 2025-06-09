import './style.css';

export const QuestionsList = ({
  items,
  onAction,
  emptyMessage,
  ariaLabel,
  classPrefix = 'questions-list',
}) => {
  return (
    <div className={classPrefix}>
      <ul className={classPrefix + '__list'}>
        {items.length === 0 ? (
          <li className={classPrefix + '__empty'}>{emptyMessage}</li>
        ) : (
          items.map((item, index) => (
            <li
              key={index}
              className={classPrefix + '__item'}
              onClick={() => onAction(index)} // Klik na celou kartu
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onAction(index);
              }}
              aria-label={`${ariaLabel}: ${item}`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation(); // zabrání spuštění onClick na li
                  onAction(index);
                }}
                className={classPrefix + '__button'}
                aria-label={ariaLabel}
              >
                <i className="fi fi-rr-cross-circle"></i>
              </button>
              <span className={classPrefix + '__text'}>{item}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
