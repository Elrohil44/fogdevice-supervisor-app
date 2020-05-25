import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  array, func, string,
} from 'prop-types';
import {
  COMMANDS, ENVIRONMENT_HEIGHT, ENVIRONMENT_WIDTH, TRIGGERS,
} from '../../config';

import './style.sass';

const MULTIPLIER = 10;

const EnvironmentCanvas = ({
  id,
  emulators,
  commands,
  onSelect,
}) => {
  const canvasRef = useRef();
  const [iteration, setIteration] = useState(0);

  const heaters = useMemo(() => {
    const placedHeaters = {};

    const executedCommands = commands
      .filter((cmd) => cmd && cmd.iteration < iteration);

    executedCommands
      .filter((cmd) => cmd.trigger === TRIGGERS.EVERY)
      .map((cmd) => ({
        ...cmd,
        iteration: Math.floor(iteration / cmd.iteration) * cmd.iteration,
      }))
      .forEach((cmd) => executedCommands.push(cmd));

    executedCommands
      .sort((cmd1, cmd2) => cmd1.iteration - cmd2.iteration)
      .forEach(({
        command, params: { x, y, id: heaterId } = {},
      }) => {
        if (command === COMMANDS.PLACE_HEATER) {
          placedHeaters[heaterId] = { x, y };
        }
        if (command === COMMANDS.REMOVE_HEATER) {
          placedHeaters[heaterId] = undefined;
        }
      });

    return Object.values(placedHeaters).filter(Boolean);
  }, [commands, iteration]);

  const drawEmulator = useCallback((ctx, { x, y } = {}) => {
    if (typeof x === 'number' && typeof y === 'number') {
      ctx.beginPath();
      ctx.arc(x * MULTIPLIER, y * MULTIPLIER, MULTIPLIER, 0, 2 * Math.PI);
      ctx.fillStyle = '#000';
      ctx.fill();
    }
  }, []);

  const drawHeater = useCallback((ctx, { x, y } = {}) => {
    if (typeof x === 'number' && typeof y === 'number') {
      ctx.fillStyle = '#F00';
      ctx.fillRect((x * MULTIPLIER) - 10, (y * MULTIPLIER) - 10, 20, 20);
    }
  }, []);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.fillStyle = '#FFF';
      context.fillRect(0, 0, ENVIRONMENT_WIDTH * MULTIPLIER, ENVIRONMENT_HEIGHT * MULTIPLIER);
      emulators.forEach((emulator) => drawEmulator(context, emulator));
      heaters.forEach((heater) => drawHeater(context, heater));
    }
  }, [emulators, heaters, drawEmulator, drawHeater]);

  const onIterationChange = useCallback((event) => {
    setIteration(Math.floor(event.target.value) || 0);
  }, []);

  const onClick = useCallback((event) => {
    const { current: canvas } = canvasRef;
    if (canvas) {
      const {
        left, top, width, height,
      } = canvas.getBoundingClientRect();
      const x = Math.floor(ENVIRONMENT_WIDTH * ((event.clientX - left) / width));
      const y = Math.floor(ENVIRONMENT_HEIGHT * ((event.clientY - top) / height));
      if (onSelect) {
        onSelect({ x, y });
      }
    } else if (onSelect) {
      onSelect({ x: 0, y: 0 });
    }
  }, [onSelect]);

  return (
    <div className="environment-canvas">
      <canvas
        ref={canvasRef}
        id={id}
        width={ENVIRONMENT_WIDTH * MULTIPLIER}
        height={ENVIRONMENT_HEIGHT * MULTIPLIER}
        onClick={onClick}
      />
      <label>{ 'Iteration counter' }</label>
      <input
        type="number"
        onChange={onIterationChange}
        value={iteration}
        step={1}
        min={0}
      />
    </div>
  );
};

EnvironmentCanvas.propTypes = {
  id: string,
  emulators: array,
  commands: array,
  onSelect: func,
};

EnvironmentCanvas.defaultProps = {
  id: 'environmentCanvas',
  emulators: [],
  commands: [],
};

export default EnvironmentCanvas;
