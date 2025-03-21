/* Helps capture hard-to-catch errors that disappear upon navigating
to a different site, which clears the console of any printed errors.
Lets the user save the error to a text file. */
export function saveErrToTxt(err: any) {
    let strErr = JSON.stringify(err, Object.getOwnPropertyNames(err));
    let blob = new Blob([strErr], {type: 'text/plain;charset=utf-8'});
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'ErrorReport.txt';
    a.click();
    URL.revokeObjectURL(url);
}