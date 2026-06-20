"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Cell = 0 | 1;
type Point = { x: number; y: number };

const GRID_SIZE = 12;

function createGrid(): Cell[][] {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => 0),
  );
}

function bfsPath(
  grid: Cell[][],
  start: Point,
  end: Point,
): Point[] | null {
  const queue: Point[] = [start];
  const visited = new Set<string>();
  const parent = new Map<string, string>();
  const key = (p: Point) => `${p.x},${p.y}`;

  visited.add(key(start));

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.x === end.x && current.y === end.y) {
      const path: Point[] = [];
      let k = key(end);
      while (k) {
        const [x, y] = k.split(",").map(Number);
        path.unshift({ x, y });
        k = parent.get(k) ?? "";
        if (k === key(start)) {
          path.unshift(start);
          break;
        }
      }
      return path;
    }

    const neighbors = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 },
    ];

    for (const next of neighbors) {
      if (
        next.x < 0 ||
        next.y < 0 ||
        next.x >= GRID_SIZE ||
        next.y >= GRID_SIZE ||
        grid[next.y][next.x] === 1
      ) {
        continue;
      }
      const nextKey = key(next);
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      parent.set(nextKey, key(current));
      queue.push(next);
    }
  }

  return null;
}

export function InteractiveMazeDemo() {
  const [grid, setGrid] = useState<Cell[][]>(createGrid);
  const [start] = useState<Point>({ x: 1, y: 1 });
  const [end] = useState<Point>({ x: GRID_SIZE - 2, y: GRID_SIZE - 2 });
  const [path, setPath] = useState<Point[]>([]);
  const [mode, setMode] = useState<"wall" | "erase">("wall");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const solve = useCallback(() => {
    const result = bfsPath(grid, start, end);
    setPath(result ?? []);
  }, [grid, start, end]);

  const toggleCell = (x: number, y: number) => {
    if ((x === start.x && y === start.y) || (x === end.x && y === end.y)) return;
    setGrid((prev) => {
      const next = prev.map((row) => [...row]) as Cell[][];
      next[y][x] = mode === "wall" ? 1 : 0;
      return next;
    });
    setPath([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isPath = path.some((p) => p.x === x && p.y === y);
        const isStart = x === start.x && y === start.y;
        const isEnd = x === end.x && y === end.y;

        if (isStart) ctx.fillStyle = "#22d3ee";
        else if (isEnd) ctx.fillStyle = "#a78bfa";
        else if (isPath) ctx.fillStyle = "#34d399";
        else if (grid[y][x] === 1) ctx.fillStyle = "#27272a";
        else ctx.fillStyle = "#18181b";

        ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
      }
    }
  }, [grid, path, start, end]);

  return (
    <div className="flex h-full min-h-[320px] flex-col p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setMode("wall")}
          className={`rounded px-3 py-1 text-xs ${mode === "wall" ? "bg-cyan-500 text-zinc-950" : "bg-zinc-800 text-zinc-300"}`}
        >
          벽 그리기
        </button>
        <button
          type="button"
          onClick={() => setMode("erase")}
          className={`rounded px-3 py-1 text-xs ${mode === "erase" ? "bg-cyan-500 text-zinc-950" : "bg-zinc-800 text-zinc-300"}`}
        >
          지우기
        </button>
        <button
          type="button"
          onClick={solve}
          className="rounded bg-emerald-500 px-3 py-1 text-xs text-zinc-950"
        >
          BFS 실행
        </button>
        <button
          type="button"
          onClick={() => {
            setGrid(createGrid());
            setPath([]);
          }}
          className="rounded bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
        >
          초기화
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={360}
        height={360}
        className="mx-auto cursor-crosshair rounded-lg border border-white/10"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = Math.floor(((e.clientX - rect.left) / rect.width) * GRID_SIZE);
          const y = Math.floor(((e.clientY - rect.top) / rect.height) * GRID_SIZE);
          toggleCell(x, y);
        }}
      />
      <p className="mt-2 text-center text-xs text-zinc-500">
        셀을 클릭해 벽을 그린 뒤, BFS로 시작(청록)에서 끝(보라)까지 경로를 찾아보세요.
      </p>
    </div>
  );
}
