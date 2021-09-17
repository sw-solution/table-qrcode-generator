import './style.css';
import QRCode from 'qrcode.react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { toPng } from 'html-to-image';

export default function Card(props) {
    const card_url = 'app.waitless.dev/visit/' + props.detail.place + '/' + props.detail.id;
    const node_id = props.detail.uid;

    const downloadImage = () => {
        var node = document.getElementById('card_item_download_' + node_id)
        node.parentElement.style.display = 'inline-block';

        toPng(node.parentElement)
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'qrcode-card.png'
                link.href = dataUrl
                link.click()
                link.remove();
                
                node.parentElement.style.display = 'none';
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={`card-item ${props.downloadCard ? 'download' : ''}`}>
            <div className="item-body" id={`card_item_${props.downloadCard ? 'download_' : ''}${node_id}`}>
                <div className="qrcode">
                    <QRCode value={ card_url } size={ props.downloadCard ? 590 : 160 } />
                </div>

                <a href={`http://${card_url}` } target="_blank" rel="noreferrer">
                    <div className="card-url"> { card_url } </div>
                </a>

                <div className="table-name"> { props.detail.name } </div>
            </div>
            {props.downloadCard || <button className="btn-download" onClick={ () => downloadImage() }> <FontAwesomeIcon icon={faDownload} /> </button> }
        </div>
    )
}