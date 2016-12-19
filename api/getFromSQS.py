from multiprocessing import Pool, TimeoutError
import time
import os
import multiprocessing
import boto3
import config as Config
import json
import smtplib


sqs = boto3.resource('sqs')
SQS_QUEUE_NAME=Config.SQS_QUEUE_NAME


def getFromSQS():
	queue = sqs.get_queue_by_name(QueueName=SQS_QUEUE_NAME)
	for message in queue.receive_messages():
		msg = json.loads(message.body)
        if msg is not None :
            print msg['to']
            print msg['text']
            try:
                server = smtplib.SMTP('smtp.gmail.com', 587)
                server.starttls()
                x=server.login(Config.EMAIL_ID, Config.EMAIL_ID_PASSWORD)
                z=server.sendmail(Config.EMAIL_ID, msg['to'], msg['text'])
                server.quit()
            except Exception as e:
                return json.dumps({'error':str(e)})

            message.delete()

if __name__ == '__main__':
    pool = Pool(processes=4)
    while 1:

    	multiple_results = [pool.apply_async(getFromSQS, ()) for i in range(4)]
    	time.sleep(2)


