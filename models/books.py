from flask.ext.mongokit import Document


# My book entity
class Book(Document):
    
    __collection__ = 'books'
    use_dot_notation = True

    schema = {
        'title': unicode,
        'description': unicode,
        
        'finished': bool
        }

    required_fields = ['title', 'description']
    default_values = {'finished': False}


    def __str__(self):
        return "<Book %s>" % self.title


