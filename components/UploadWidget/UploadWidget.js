import Script from 'next/script';

let cloudinary;
let widget;

const UploadWidget = ({ children, onUpload }) => {
    function handleOnLoad() {
        if (!cloudinary) {
            cloudinary = window.cloudinary;
        }
        function onIdle() {
            if (!widget) {
                widget = createWidget();
            }
        }

        'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
    }
    function generateSignature(callback, paramsToSign) {
        fetch(`/api/cloudinary/sign_cloudinary_params`, {
            method: 'POST',
            body: JSON.stringify({
                paramsToSign
            })
        }).then(r => r.json())
            .then(({ signature }) => {
                callback(signature)
            });
    }

    function createWidget() {
        const options = {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            uploadSignature: generateSignature,
            folder: "book-store",
            showAdvancedOptions: false,
            multiple: false,
            sources: [
                "local",
            ],
            styles: {
                palette: {
                    window: "#FFFFFF",
                    sourceBg: "#FAFAFA",
                    windowBorder: "#90a0b3",
                    tabIcon: "#000000",
                    inactiveTabIcon: "#555a5f",
                    menuIcons: "#555a5f",
                    link: "#000000",
                    action: "#339933",
                    inProgress: "#0433ff",
                    complete: "#339933",
                    error: "#cc0000",
                    textDark: "#000000",
                    textLight: "#fcfffd"
                },
                fonts: {
                    default: null,
                    "sans-serif": {
                        url: null,
                        active: true
                    }
                }
            }
        }

        return cloudinary?.createUploadWidget(options,
            function (error, result) {
                if (error || result.event === 'success') {
                    onUpload(error, result, widget);
                }
            }
        );
    }

    function open() {
        if (!widget) {
            widget = createWidget();
        }

        widget && widget.open();
    }

    return (
        <>
            {children({ cloudinary, widget, open })}
            <Script id="cloudinary" src="https://widget.cloudinary.com/v2.0/global/all.js" onLoad={handleOnLoad} />
        </>
    )
}

export default UploadWidget;