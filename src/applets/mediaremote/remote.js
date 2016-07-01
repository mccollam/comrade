function setScene(scene)
{
    var xhr = new XMLHttpRequest();
    
    xhr.open('PUT',
    encodeURI('http://philips-hue.udlunder/api/openHABRuntime/groups/0/action'));
    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    /*
    xhr.onload = function() {
        if (xhr.status === 200 && xhr.responseText !== newName) {
            alert('Something went wrong.  Name is now ' + xhr.responseText);
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    */
    xhr.send('{"scene":"' + scene + '"}');
}

function setStereo(status)
{
    var xhr = new XMLHttpRequest();
    var url;
    
    switch (status)
    {
        case 'on':
            //url = 'MainZone/index.put.asp?cmd0=PutSystem_OnStandby%2FON';
            url = 'MainZone/index.put.asp?cmd0=PutZone_OnOff%2FON';
            break;
        case 'off':
            url = 'MainZone/index.put.asp?cmd0=PutSystem_OnStandby%2FSTANDBY';
            break;
        case 'mute':
            url = 'MainZone/index.put.asp?cmd0=PutVolumeMute%2Fon';
            break;
        case 'unmute':
            url = 'MainZone/index.put.asp?cmd0=PutVolumeMute%2Foff';
            break;
        case 'inputdefault':
            url = 'MainZone/index.put.asp?cmd0=PutZone_InputFunction%2FSAT%2FCBL';
            break;
        case 'inputinetradio':
            url = 'MainZone/index.put.asp?cmd0=PutZone_InputFunction%2FIRADIO';
            break;
        case 'inputtuner':
            url = 'MainZone/index.put.asp?cmd0=PutZone_InputFunction%2FTUNER';
            break;
        case 'inputaux':
            url = 'MainZone/index.put.asp?cmd0=PutZone_InputFunction%2FAUX';
            break;
        case 'volumeup':
            url = 'MainZone/index.put.asp?cmd0=PutMasterVolumeBtn%2F%3E';
            break;
        case 'volumedown':
            url = 'MainZone/index.put.asp?cmd0=PutMasterVolumeBtn%2F%3E';
            break;
        default:
            return false;
    }
    
    xhr.open('GET', 'http://0005CD3A5CE1.udlunder/' + url);
    xhr.send(null);
}

function setProjector(status)
{
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://projector.udlunder/p.php?c=' + status);
    xhr.send(null);
}

function showOnly(gid, divclass)
{
    // Default to "room" but allow other classes
    divclass = typeof divclass !== 'undefined' ? divclass : "room";
    var rooms = document.getElementsByClassName(divclass);
    var i;
    
    for (i=0; i<rooms.length; i++)
    {
        if (rooms[i].id == gid)
            rooms[i].style.display = 'block';
        else
            rooms[i].style.display = 'none';
    }
    
}


//////////// Living room

function scene_lr_lightsonly_bright()
{
    setProjector('off');
    setStereo('off');
    lights_lr_bright();
}

function scene_lr_lightsonly_half()
{
    setProjector('off');
    setStereo('off');
    lights_lr_half();
}

function scene_lr_movietime()
{
    setProjector('on');
    setProjector('srchdmi');
    setStereo('on');
    setStereo('inputdefault');
    lights_lr_movie();
}

function scene_lr_radio()
{
    setProjector('off');
    setStereo('inputinetradio');
    lights_lr_bright();
}

function scene_lr_off()
{
    setProjector('off');
    setStereo('off');
    lights_lr_off();
}

function lights_lr_bright()
{
    setScene('1fe85290b-on-0');
}

function lights_lr_half()
{
    setScene('e730edbe8-on-0');
}

function lights_lr_movie()
{
    setScene('dfbc49298-on-0');
}

function lights_lr_off()
{
    setScene('dc082cec8-off-0');
}



//////////// Office

function lights_o_deepred()
{
    setScene('f1ce4ff03-on-0');
}

function lights_o_sunset()
{
    setScene('1d89a0b2a-on-0');
}

function lights_o_dim()
{
    setScene('35a788576-on-0');
}

function lights_o_off()
{
    setScene('0d1fe0821-on-0');
}

function lights_o_complements()
{
    setScene('c5f93df72-on-0');
}

function lights_o_feetup()
{
    setScene('621fca6cd-on-0');
}

function lights_o_graygreen()
{
    setScene('ac3f0cce3-on-0');
}

function lights_o_moodyblues()
{
    setScene('c4a6d7bed-on-0');
}

function lights_o_party()
{
    setScene('accfd2bbd-on-0');
}

function lights_o_beach()
{
    setScene('6fd7ff30d-on-0');
}

function lights_o_bluerain()
{
    setScene('58c35d0ef-on-0');
}

