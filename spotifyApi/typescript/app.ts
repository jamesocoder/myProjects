const test = function (...message: string[]): HTMLHeadingElement {
    let heading = document.createElement('h1');
    heading.textContent = message.join(' ');

    return heading;
}

document.body.appendChild(test('Za Warudo', 'Ist', 'Big'));