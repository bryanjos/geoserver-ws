from geoserver.wfs import tx
from geoserver.catalog import Layer
from geoscript.feature.io.json import writeJSON
import urllib2
import com.xhaus.jyson.JysonCodec as json

def sendData(hook, layer):
  url = 'http://localhost:9000/geoserver/' + hook

  features = []

  for feature in layer.features():
    features.append(json.loads(writeJSON(feature)))

  req = urllib2.Request(url, json.dumps(features), {'Content-Type': 'application/json'})
  handler = urllib2.urlopen(req)
  handler.read()
  handler.close()

@tx.before
def onBefore(req, context):
  context['before'] = True

@tx.preInsert
def onPreInsert(inserted, req, context):
  context['preInsert'] = True

@tx.postInsert
def onPostInsert(inserted, req, context):
  sendData('inserted', inserted)
  context['postInsert'] = True

@tx.preUpdate
def onPreUpdate(updated, props, req, context):
  context['preUpdate'] = True

@tx.postUpdate
def onPostUpdate(updated, props, req, context):
  sendData('updated', updated)
  context['postUpdate'] = True

@tx.preDelete
def onPreDelete(deleted, req, context):
  context['preDelete'] = True

@tx.postDelete
def onPostDelete(deleted, req, context):
  sendData('deleted', deleted)
  context['postDelete'] = True

@tx.preCommit
def onPreCommit(req, context):
  context['preCommit'] = True

@tx.postCommit
def onPostCommit(req, res, context):
  context['postCommit'] = True

@tx.abort
def onAbort(req, res, context):
  context['abort'] = True