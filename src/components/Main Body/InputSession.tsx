import "../../css/style.css"

const InputSession = () => {
  const options = ["Triceps", "Chest", "Biceps", "Back", "Shoulders", "Rest Day"]

  const onSelection = async (input: string) => {
    console.log(`here comes log 2: ${input}`)
    try {
      const body = { muscles_trained: input };
        await fetch("https://mysterious-reaches-13528.herokuapp.com/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
    <section className="dropdown">
          <h2>Choose a session</h2>
          <select
              onChange={(e) => {
              onSelection(e.target.value);
            }}
          >
            <option className="dropdownelement">What are we training today?</option>
            {options.map((val: string) => {
              return (
                <option className="dropdownelement" key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </section>
    </div>
  );
};

export default InputSession;
