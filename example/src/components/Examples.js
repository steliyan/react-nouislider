import React, { useEffect } from 'react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

import './examples.css';
import './colorpicker.css';
import './toggle.css';
import './custom-fill.css';

const COLORS = ['red', 'green', 'blue'];
const colors = [0, 0, 0];

const CustomFillerWithRef = () => {
  const ref = React.useRef();
  const fillerRef = React.useRef(document.createElement("div"));

  useEffect(() => {
    if (ref && ref.current) {
      fillerRef.current.classList.add("noUi-custom-filler");
      ref.current.appendChild(fillerRef.current);
    }

    return () => {
      if (ref && ref.current) {
        ref.current.removeChild(fillerRef.current);
      }
    };
  }, [ref, fillerRef]);

  return (
    <Nouislider
      ref={ref}
      start={[2]}
      range={{
        min: [0],
        max: [5]
      }}
      step={1}
      onUpdate={values => {
        const { current: filler } = fillerRef;
        const value = parseInt(values[0], 10);

        filler.style.width = value === 0 || value === 5 ? "12.5%" : "25%";
        filler.style.marginLeft = value === 0 ? 0 : "-12.5%";
        filler.style.left = `${(value / 5) * 100}%`;
      }}
      onChange={values => {
        const { noUiSlider } = ref.current;
        const value = parseInt(values[0], 10);
        if (value === 0) {
          noUiSlider.set(1);
        } else if (value === 5) {
          noUiSlider.set(4);
        }
      }}
    />
  );
};

class Examples extends React.Component {
  state = {
    color: 'rgb(127, 127, 127)',
    textValue: null,
    percent: null,
    value: 0,
    disabled: false,
    range: {
      min: 0,
      max: 100,
    },
    ref: null,
  };

  onUpdate = index => (render, handle, value, un, percent) => {
    colors[index] = value[0];
    this.setState({ color: `rgb(${colors.join(',')})` });
  };

  onSlide = (render, handle, value, un, percent) => {
    this.setState({
      textValue: value[0].toFixed(2),
      percent: percent[0].toFixed(2),
    });
  };

  onSkipSlide = (render, handle, value, un, percent) => {
    this.setState({
      skippingValue: value[0],
    });
  };

  handleClick = () => {
    this.setState(prevState => ({ value: prevState.value + 10 }));
  };

  changeDisabled = () => {
    this.setState(prevState => ({ disabled: !prevState.disabled }));
  };

  changeRange = () => {
    this.setState({
      range: {
        min: 0,
        max: 200,
      },
    });
  };

  changeByRef = () => {
    const { ref } = this.state;
    if (ref && ref.noUiSlider) {
      ref.noUiSlider.set(20);
    }
  };

  render() {
    const {
      color,
      textValue,
      percent,
      skippingValue,
      value,
      disabled,
      range,
      ref,
    } = this.state;
    return (
      <section className="options">
        <h2>
          <a href="https://refreshless.com/nouislider/examples/">Examples:</a>
        </h2>
        <div className="examples">
          <h4>Colorpicker:</h4>
          <div className="slider" id="colorpicker">
            {COLORS.map((item, index) => (
              <Nouislider
                key={item}
                id={item}
                start={127}
                connect={[true, false]}
                orientation="vertical"
                range={{
                  min: 0,
                  max: 255,
                }}
                onUpdate={this.onUpdate(index)}
              />
            ))}
            <div id="result" style={{ background: color, color }} />
          </div>
        </div>
        <div className="examples">
          <h4>Keyboard support:</h4>
          <Nouislider
            start={10}
            range={{
              min: 0,
              max: 100,
            }}
          />
        </div>
        <div className="examples">
          <h4>Using ref:</h4>
          <button onClick={this.changeByRef}>Change with ref</button>
          <Nouislider
            ref={instance => {
              if (instance && !ref) {
                this.setState({ ref: instance });
              }
            }}
            start={0}
            range={{
              min: 0,
              max: 50,
            }}
          />
        </div>
        <div className="examples">
          <h4>Using ref to build custom filler:</h4>
          <CustomFillerWithRef />
        </div>
        <div className="examples">
          <h4>Non linear slider:</h4>
          <Nouislider
            connect
            start={[500, 4000]}
            behaviour="tap"
            range={{
              min: [0],
              '10%': [500, 500],
              '50%': [4000, 1000],
              max: [10000],
            }}
            onSlide={this.onSlide}
          />
          {textValue && percent && (
            <div>
              Value: {textValue}, {percent} %
            </div>
          )}
        </div>
        <div className="examples">
          <h4>Clickable pips:</h4>
          <Nouislider
            start={[50]}
            pips={{ mode: 'count', values: 5 }}
            clickablePips
            range={{
              min: 0,
              max: 100,
            }}
          />
        </div>
        <div className="examples">
          <h4>Skipping steps:</h4>
          <Nouislider
            start={20}
            snap
            range={{
              min: 0,
              '10%': 10,
              '20%': 20,
              '30%': 30,
              '50%': 50,
              '60%': 60,
              '70%': 70,
              '90%': 90,
              max: 100,
            }}
            onSlide={this.onSkipSlide}
          />
          {!!skippingValue && <div>Value: {skippingValue}</div>}
        </div>
        <div className="examples">
          <h4>Creating a toggle:</h4>
          <Nouislider
            id="slider-toggle"
            orientation="vertical"
            start={0}
            range={{
              min: [0, 1],
              max: 1,
            }}
          />
        </div>
        <div className="examples">
          <h4>Change start by changing state:</h4>
          <button onClick={this.handleClick}>Change state</button>
          <Nouislider
            start={value}
            range={{
              min: 0,
              max: 100,
            }}
          />
        </div>
        <div className="examples">
          <h4>Change disabled by changing state:</h4>
          <button onClick={this.changeDisabled}>Change state</button>
          <Nouislider
            disabled={disabled}
            start={40}
            range={{
              min: 0,
              max: 100,
            }}
          />
        </div>
        <div className="examples">
          <h4>Change range by changing state:</h4>
          <button onClick={this.changeRange}>Change range</button>
          <Nouislider start={40} range={range} />
        </div>
      </section>
    );
  }
}

export default Examples;
