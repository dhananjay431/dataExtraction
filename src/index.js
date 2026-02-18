import "./lib/pdf.mjs";
//import "../node_modules/leader-line/leader-line.min.js";
// import "./lib/build/leader-line.js";

// import { WorkerMessageHandler } from "./lib/build/pdf.worker.mjs"
import { Subject, Observable, from, fromEvent, mergeMap, tap } from "./lib/rxjs.umd.min.js"
import * as rxjs from "./lib/rxjs.umd.min.js";
var { pdfjsLib } = globalThis;

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';
// pdfjsLib.GlobalWorkerOptions.workerSrc = WorkerMessageHandler;

export const pdf = async function ({ pdfData, pageNumber, scale, id }) {
    let base64 = await pdfToBase64(pdfData)
    debugger;
    let loadingTask = pdfjsLib.getDocument({ data: atob(base64.split(",")[1]) });
    let pdf = await loadingTask.promise;
    let page = await pdf.getPage(pageNumber);
    let viewport = page.getViewport({ scale: scale });
    let canvas = document.getElementById(id);
    let context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    let renderContext = { canvasContext: context, viewport: viewport };
    return page.render(renderContext).promise;
}
export const s = Subject;
export const o = Observable;
export const f = from;
export const ev = fromEvent;
export const x = rxjs;
export const mm = mergeMap;

export const t = tap;
export const pp = function (a, ...b) {
    return a.pipe(...b)
};

function pdfToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result); // Base64 string
        };
        reader.onerror = error => reject(error);
    });
}
export const isVisible = function (el, container) {
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return (
        elRect.top < containerRect.bottom &&
        elRect.bottom > containerRect.top
    );
}